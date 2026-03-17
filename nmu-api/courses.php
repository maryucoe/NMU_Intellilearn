<?php
require __DIR__ . '/db.php';

$pdo = get_db();

$id = isset($_GET['id']) ? (int) $_GET['id'] : null;

if ($id) {
    // Single course with modules and basic instructor info
    $stmt = $pdo->prepare("
        SELECT c.course_id,
               c.title,
               c.description,
               c.long_description,
               c.duration,
               c.rating,
               c.total_student,
               c.instructor_id,
               u.first_name,
               u.last_name
        FROM courses c
        LEFT JOIN users u ON u.user_id = c.instructor_id
        WHERE c.course_id = :id AND c.is_published = 1
        LIMIT 1
    ");
    $stmt->execute(['id' => $id]);
    $course = $stmt->fetch();

    if (!$course) {
        echo json_encode(['success' => false, 'error' => 'Course not found']);
        exit;
    }

    $modulesStmt = $pdo->prepare("
        SELECT module_id, title, duration
        FROM course_modules
        WHERE course_id = :id
        ORDER BY order_index ASC, module_id ASC
    ");
    $modulesStmt->execute(['id' => $id]);
    $modules = $modulesStmt->fetchAll();

    $modules = array_map(function ($m) {
        return [
            'id'       => (int) $m['module_id'],
            'title'    => $m['title'],
            'duration' => $m['duration'] ? $m['duration'] . ' min' : null,
        ];
    }, $modules);

    $instructorName = trim(($course['first_name'] ?? '') . ' ' . ($course['last_name'] ?? ''));

    echo json_encode([
        'success' => true,
        'course'  => [
            'id'              => (int) $course['course_id'],
            'title'           => $course['title'],
            'description'     => $course['description'],
            'longDescription' => $course['long_description'],
            'duration'        => $course['duration'] ? $course['duration'] . ' min' : null,
            'students'        => (int) $course['total_student'],
            'rating'          => (float) $course['rating'],
            'level'           => $course['duration'] > 1000 ? 'Advanced' : ($course['duration'] > 700 ? 'Intermediate' : 'Beginner'),
            'instructor'      => $instructorName ?: 'Instructor',
            'modules'         => $modules,
        ],
    ]);
    exit;
}

// List of published courses
$stmt = $pdo->query("
    SELECT course_id,
           title,
           description,
           duration,
           rating,
           total_student
    FROM courses
    WHERE is_published = 1
    ORDER BY created_at DESC
");

$rows = $stmt->fetchAll();

$courses = array_map(function ($row) {
    $durationMinutes = (int) $row['duration'];
    $durationLabel = $durationMinutes
        ? $durationMinutes . ' min'
        : 'Self-paced';

    $level = $durationMinutes > 1000 ? 'Advanced' : ($durationMinutes > 700 ? 'Intermediate' : 'Beginner');

    return [
        'id'          => (int) $row['course_id'],
        'title'       => $row['title'],
        'description' => $row['description'],
        'duration'    => $durationLabel,
        'students'    => (int) $row['total_student'],
        'rating'      => (float) $row['rating'],
        'level'       => $level,
    ];
}, $rows);

echo json_encode(['success' => true, 'courses' => $courses]);

