<?php
// This script processes form submissions and sends them to the leads@digioverse.com address.
// It supports both traditional form-encoded POST requests (from HTML forms) and JSON payloads (from fetch requests).

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Determine the content type to correctly parse the incoming data.
    $contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';

    // Retrieve data based on content type.
    $data = [];
    if (strpos($contentType, 'application/json') !== false) {
        // Read raw input for JSON bodies.
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    } else {
        // Fallback to form-encoded data.
        $data = $_POST;
    }

    // Prepare the email content.
    $to = 'support@digioverse.com';
    $subject = 'New form submission from Digioverse website';
    $body = "";
    foreach ($data as $key => $value) {
        // Sanitize key and value for safety.
        $k = ucfirst(preg_replace('/[_-]+/', ' ', trim($key)));
        $v = trim($value);
        $body .= $k . ": " . $v . "\n";
    }
    // Basic headers. Using a no-reply address to avoid spoofing user emails.
    $headers = "From: no-reply@digioverse.com\r\n";
    $headers .= "Reply-To: no-reply@digioverse.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Attempt to send the email.
    if (@mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        // Log error details to the server error log.
        error_log('Mail sending failed: ' . print_r(error_get_last(), true));
        echo "error";
    }
    exit;
}
?>