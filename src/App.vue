<template>
	<div id="app">
		<mcv-topbar />
		<router-view />
	</div>
</template>

<script>
import McvTopbar from '@/components/Topbar'

export default {
	name: 'App',
	components: {
		McvTopbar
	}
}
</script>
