<?php

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Safely get form values
    $name = isset($_POST["author"]) ? strip_tags(trim($_POST["author"])) : '';
    $name = str_replace(array("\r", "\n"), array(" ", " "), $name);

    $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
    $url = isset($_POST["url"]) ? strip_tags(trim($_POST["url"])) : '';
    $phone = isset($_POST["phone"]) ? strip_tags(trim($_POST["phone"])) : '';
    $message = isset($_POST["comment"]) ? trim($_POST["comment"]) : '';

    // Validate required fields
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Oops! Please fill all required fields correctly.";
        exit;
    }

    // 👉 CHANGE THIS TO YOUR EMAIL
    $recipient = "youremail@example.com";

    // Email subject
    $subject = "New Contact Form Message from $name";

    // Email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Website: $url\n\n";
    $email_content .= "Message:\n$message\n";

    // Email headers
    $email_headers = "From: $name <$email>";

    // Send email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Great! Your message has been sent successfully.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }

} else {
    http_response_code(403);
    echo "There was a problem with your submission.";
}

?>