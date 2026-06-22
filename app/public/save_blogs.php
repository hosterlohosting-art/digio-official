<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, X-Admin-Password');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = isset($_SERVER['HTTP_X_ADMIN_PASSWORD']) ? $_SERVER['HTTP_X_ADMIN_PASSWORD'] : '';
    if ($password !== 'digioverseadmin2026') {
        header('HTTP/1.1 401 Unauthorized');
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Invalid JSON payload']);
        exit;
    }

    if (file_put_contents('blogs.json', json_encode($decoded, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
    } else {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Failed to save blogs']);
    }
    exit;
}
?>
