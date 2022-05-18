<script>
  import { onMount } from 'svelte'

  function startPauseTimer() {

    if (!running) {
      interval = setInterval(() => {

        time--

        // Reset timer when it's done
        if (time < 0) {
          clearInterval(interval)

          running = !running
          time = TIME_LENGTHS.pomodoro
        }

        updateOffset()
        convertTime()
      }, 1000)

    } else {
      clearInterval(interval)
    }

    running = !running
  }

  function convertTime() {

    // Convert total time into minutes and seconds
    minutes = Math.floor(time / 60)
    seconds = time % 60

    // Convert minutes and sconds into string
    minutes = minutes.toString().length === 1 ? '0' + minutes : minutes.toString()
    seconds = seconds.toString().length === 1 ? '0' + seconds : seconds.toString()

    return { minutes, seconds }
  }

  function updateOffset() {

    // 25 minutes => 25*60 = 1500 seconds
    // Offset: 700 => 1500 seconds
    const currentOffset = progressBar.style['stroke-dashoffset']
    const newOffset = 700 - (time / TIME_LENGTHS.pomodoro * 700)

    progressBar.style['stroke-dashoffset'] = newOffset
  }

  const TIME_LENGTHS = {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900
  }

  let progressBar
  let progress
  let timerBtn
  let interval
  let time = TIME_LENGTHS.pomodoro
  let minutes = '25'
  let seconds = '00'
  let running = false
  let activity = Object.keys(TIME_LENGTHS)[0]

  onMount(() => {

    // Wait for DOM to be loaded before getting the elements
    progressBar = document.getElementById('progress-bar')
    timerBtn = document.getElementById('timer-btn')

    updateOffset()
  })
</script>

<h1 class="text-light-blue text-center text-3xl font-medium my-12">pomodoro</h1>

<div class="bg-very-dark-blue rounded-full p-2 w-fit mx-auto flex justify-center">
  <button class="text-gray-500 rounded-full px-8 py-4 font-medium focus:bg-orange-red focus:text-dark-blue">pomodoro</button>
  <button class="text-gray-500 rounded-full px-8 py-4 font-medium focus:bg-orange-red focus:text-dark-blue">short break</button>
  <button class="text-gray-500 rounded-full px-8 py-4 font-medium focus:bg-orange-red focus:text-dark-blue">long break</button>
</div>

<button class="w-64 h-64 rounded-full mx-auto my-10 bg-gradient-to-br from-dark-blue-shadow to-light-blue-shadow shadow-neumorphism relative grid place-items-center" on:click={startPauseTimer}>
  <svg class="w-full h-full absolute">
    <circle id="progress-bar" class="stroke-orange-red fill-transparent" cx="128" cy="128" r="110" stroke-width="12" stroke-linecap="round" stroke-dasharray="700" stroke-dashoffset="0" transform="rotate(-90, 128 128)"/>
  </svg>
  <div class="text-light-blue text-center grid grid-rows-3">
    <p id="label" class="text-6xl font-semibold row-start-2">{minutes}:{seconds}</p>
    <p id="status" class="row-start-3 self-center uppercase tracking-[10px] text-xs font-semibold">{running ? 'pause' : 'start'}</p>
  </div>
</button>
