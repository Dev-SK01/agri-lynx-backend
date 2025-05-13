const emailTemplate = (otp) => {
    return `<body style="background-color: #f4f4f4; font-family: 'Inter', sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center;">
    <div class="container" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 30px; text-align: center; width: 90%; max-width: 600px;">
        <div class="logo" style="margin-bottom: 20px;">
            <img src="https://raw.githubusercontent.com/Dev-SK01/agri-lynx/refs/heads/master/agri-lynx/public/icon/logo.png" alt="Agri Lynx" style="height: 100px;" loading="lazy">
        </div>
        <h1 style="color:green; margin-bottom: 10px;"> One Time Password</h1>
        <p style="color: #7f8c8d; margin-bottom: 25px;">Verify Code in AGRI LYNX App</p>
        <div class="otp-box" style="display: flex; justify-content: center; margin-bottom: 20px; align-items:"center";>
            <span id="otp" style="font-size: 20px; letter-spacing: 10px; color:green; font-weight:bold;">${otp}</span>
        </div>
      <div>
      <h3 style="color:green; margin-bottom: 10px;">Expires In 5 mintues</h3>
      <p class="footer" style="margin-top: 30px; font-size: 12px; color: #95a5a6;">This is an automated email. Please do not reply.</p>
      </div>
    </div>
</body>`
}

module.exports = emailTemplate;