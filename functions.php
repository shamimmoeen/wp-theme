<?php

add_action( 'wp_enqueue_scripts', 'wp_theme_load_styles' );

/**
 * Load the scripts.
 */
function wp_theme_load_styles() {
	wp_enqueue_style( 'child-style', get_stylesheet_uri(),
		array( 'parenthandle' ),
		wp_get_theme()->get('Version') // this only works if you have Version in the style header
	);
}
