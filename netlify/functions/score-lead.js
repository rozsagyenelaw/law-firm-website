// Netlify Function for Lead Scoring and Email Alerts
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
    
    try {
        const data = JSON.parse(event.body);
        const score = data.score || 0;
        const tier = data.tier || 'UNKNOWN';
        
        console.log(`New lead: ${data.name} | Score: ${score} | Tier: ${tier}`);
        
        // Send email alert for HOT and WARM leads via SendGrid
        if (tier === 'HOT' || tier === 'WARM') {
            const emoji = tier === 'HOT' ? '🔥🔥🔥' : '⚡';
            const urgency = tier === 'HOT' ? 'CALL IMMEDIATELY!' : 'High Priority';
            
            const emailSubject = `${emoji} ${tier} LEAD - ${urgency} - ${data.name}`;
            
            const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .header { background: ${tier === 'HOT' ? '#dc3545' : '#ffc107'}; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .info-box { background: #f8f9fa; padding: 15px; margin: 10px 0; border-left: 4px solid ${tier === 'HOT' ? '#dc3545' : '#ffc107'}; }
        .call-now { background: #28a745; color: white; padding: 15px; text-align: center; font-size: 24px; margin: 20px 0; border-radius: 5px; }
        .label { font-weight: bold; color: #495057; }
        .value { color: #212529; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${emoji} ${tier} LEAD - ${urgency}</h1>
        <h2>Score: ${score} / 200</h2>
    </div>
    
    <div class="content">
        <div class="call-now">
            📞 CALL NOW: ${data.phone}
        </div>
        
        <div class="info-box">
            <p><span class="label">Name:</span> <span class="value">${data.name}</span></p>
            <p><span class="label">Phone:</span> <span class="value">${data.phone}</span></p>
            <p><span class="label">Email:</span> <span class="value">${data.email}</span></p>
        </div>
        
        <div class="info-box">
            <p><span class="label">Service:</span> <span class="value">Living Trust ($575)</span></p>
            <p><span class="label">Estate Value:</span> <span class="value">${data.estate_value || 'N/A'}</span></p>
            <p><span class="label">Timeline:</span> <span class="value">${data.timeline || 'N/A'}</span></p>
            <p><span class="label">Owns Property:</span> <span class="value">${data.owns_property || 'N/A'}</span></p>
            <p><span class="label">Married:</span> <span class="value">${data.married || 'N/A'}</span></p>
            <p><span class="label">Minor Children:</span> <span class="value">${data.minor_children || 'N/A'}</span></p>
        </div>
        
        ${data.message ? `
        <div class="info-box">
            <p><span class="label">Message:</span></p>
            <p class="value">${data.message}</p>
        </div>
        ` : ''}
        
        <div class="info-box">
            <p><span class="label">Source:</span> <span class="value">${data.utm_source || 'Direct'}</span></p>
            <p><span class="label">Campaign:</span> <span class="value">${data.utm_campaign || 'Direct'}</span></p>
            <p><span class="label">Keyword:</span> <span class="value">${data.utm_term || 'Direct'}</span></p>
            <p><span class="label">GCLID:</span> <span class="value">${data.gclid || 'N/A'}</span></p>
        </div>
        
        <div class="call-now">
            ${tier === 'HOT' ? '🔥 CALL WITHIN 5 MINUTES! 🔥' : '⚡ CALL TODAY!'}
        </div>
    </div>
</body>
</html>`;

            // Send via SendGrid API
            const sendGridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    personalizations: [{
                        to: [{ email: process.env.ALERT_EMAIL }],
                        subject: emailSubject
                    }],
                    from: {
                        email: process.env.FROM_EMAIL || 'leads@livingtrust-attorneys.com',
                        name: 'Lead Alert System'
                    },
                    content: [{
                        type: 'text/html',
                        value: emailBody
                    }]
                })
            });
            
            if (!sendGridResponse.ok) {
                const errorText = await sendGridResponse.text();
                console.error('SendGrid error:', errorText);
            } else {
                console.log('Email alert sent successfully');
            }
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                score: score,
                tier: tier,
                alert_sent: tier === 'HOT' || tier === 'WARM'
            })
        };
        
    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};
