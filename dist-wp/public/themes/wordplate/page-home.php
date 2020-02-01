<?php
/**
 * Home Page
 */

// load current post
$post = new Timber\Post();
$data = Timber::get_context();
$data['post'] = $post;

// load contact page by id
$contact_page_id = 11;
$contact = new TimberPost( $contact_page_id );
$data['contact'] = $contact;

//dump($data);

Timber::render('templates/pages/HomePage.twig', $data);

