<?php
/**
 * Home Page
 */

$context = Timber::get_context();
//dump($context); exit;
Timber::render('templates/pages/HomePage.twig', $context);

