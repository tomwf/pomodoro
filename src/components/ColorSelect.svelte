<script>
  import { onMount } from 'svelte'
  import CheckIcon from './icons/CheckIcon.svelte'

  function selectColor(e) {

    const target = e.target

    // Track selected activity so the color applies on it
    currentActivity = document.getElementById(activity)

    // Do nothing when the same color is selected twice
    if (target.id === color || target.localName !== 'button') return

    // Apply colors on elements
    pomodoro.classList.add(`focus:bg-${COLORS[target.id]}`)
    pomodoro.classList.remove(`focus:bg-${COLORS[color]}`)
    shortBreak.classList.add(`focus:bg-${COLORS[target.id]}`)
    shortBreak.classList.remove(`focus:bg-${COLORS[color]}`)
    longBreak.classList.add(`focus:bg-${COLORS[target.id]}`)
    longBreak.classList.remove(`focus:bg-${COLORS[color]}`)
    progressBar.classList.add(`stroke-${COLORS[target.id]}`)
    progressBar.classList.remove(`stroke-${COLORS[color]}`)
    currentActivity.classList.add(`bg-${COLORS[target.id]}`)
    currentActivity.classList.remove(`bg-${COLORS[color]}`)

    // Show checkmark on selected color
    const newCheckmark = document.querySelector(`#${target.id} > svg`)
    const checkmark = document.querySelector(`#${color} > svg`)

    checkmark.classList.add('hidden')
    newCheckmark.classList.remove('hidden')

    // Remember selected color
    color = target.id
  }

  export let COLORS
  export let color
  export let activity
  let pomodoro
  let shortBreak
  let longBreak
  let progressBar
  let currentActivity

  onMount(() => {
    pomodoro = document.getElementById('pomodoro')
    shortBreak = document.getElementById('shortBreak')
    longBreak = document.getElementById('longBreak')
    progressBar = document.getElementById('progress-bar')
    currentActivity = document.getElementById(activity)
  })
</script>

<div class="flex items-center justify-between gap-4 pt-4">
  <h3 class="font-medium tracking-widest uppercase">Color</h3>
  <button id="orangeRed" class="ml-auto rounded-full bg-orange-red block w-12 h-12 text-white font-medium grid place-items-center" on:click={selectColor}><CheckIcon /></button>
  <button id="cyan" class="rounded-full bg-cyan-400 block w-12 h-12 text-white font-medium grid place-items-center" on:click={selectColor}><CheckIcon hidden/></button>
  <button id="fuchsia" class="rounded-full bg-fuchsia-400 block w-12 h-12 text-white font-medium grid place-items-center" on:click={selectColor}><CheckIcon hidden/></button>
</div>
