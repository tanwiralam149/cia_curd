<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Successful</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; background: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px 0px #ddd; }
        h2 { color: #333; }
        p { font-size: 16px; color: #666; }
        .footer { margin-top: 20px; font-size: 14px; color: #999; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Welcome, <?php echo $name; ?>!</h2>
        <p>Thank you for registering on our website.</p>
        <p><strong>Email:</strong> <?php echo $email; ?></p>
        <p><strong>Phone:</strong> <?php echo $phone; ?></p>
        <p>We are excited to have you with us.</p>
        <p class="footer">Best Regards,<br>Your Website Team</p>
    </div>
</body>
</html>
