/// <reference types="svelte" />

import './style.css';

import App from './App.svelte';

const app = new App({
	target: document.getElementById('vite-project'),
})

export default app
