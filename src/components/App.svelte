<script>
  import { onMount } from 'svelte'

  import SettingsIcon from './icons/SettingsIcon.svelte'
  import CloseIcon from './icons/CloseIcon.svelte'
  import GithubIcon from './icons/GithubIcon.svelte'

  import Head from './Head.svelte'
  import FontSelect from './FontSelect.svelte'
  import ColorSelect from './ColorSelect.svelte'

  function startPauseTimer() {

    if (!running) {
      interval = setInterval(() => {

        time--

        // Reset timer when it's done
        if (time < 0) {
          clearInterval(interval)
          playAudio()

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
    const newOffset = 700 - (time / TIME_LENGTHS[activity] * 700)

    progressBar.style['stroke-dashoffset'] = newOffset
  }

  function selectActivity(e) {

    const newActivity = e.target.id

    // Do nothing when the same button is clicked twice
    if (activity === newActivity) return

    // Stop the timer if it's running
    if (running) startPauseTimer()

    // Toggle activity buttons colors
    const prevColor = document.getElementById(activity).className.split(' ').filter(name => /^bg/.test(name))[0]
    document.getElementById(activity).classList.remove(prevColor, 'text-dark-blue')
    document.getElementById(newActivity).classList.add(`bg-[${COLORS[color]}]`, 'text-dark-blue')

    // Update new time length
    time = TIME_LENGTHS[newActivity]
    convertTime()

    // Remember selected activity
    activity = newActivity
  }

  function toggleModal() {
    const modal = document.getElementById('modal')
    if (modal.classList.contains('hidden')) {
      modal.classList.remove('hidden')
    } else {
      modal.classList.add('hidden')
    }
  }

  function setTime(e) {
    TIME_LENGTHS[e.target.name] = 60 * e.target.value
  }

  function playAudio() {
    alarm.play()
  }

  const TIME_LENGTHS = {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900
  }

  const COLORS = {
    orangeRed: '#eb6969',
    cyan: '#22d3ee',
    fuchsia: '#e879f9',
  }

  let color = Object.keys(COLORS)[0]

  let progressBar
  let progress
  let timerBtn
  let interval
  let time = TIME_LENGTHS.pomodoro
  let minutes = '25'
  let seconds = '00'
  let running = false
  let activity = Object.keys(TIME_LENGTHS)[0]
  let pomodoro
  let shortBreak
  let longBreak
  let alarm

  onMount(() => {

    // Wait for DOM to be loaded before getting the elements
    progressBar = document.getElementById('progress-bar')
    timerBtn = document.getElementById('timer-btn')
    pomodoro = document.getElementById('pomodoro')
    shortBreak = document.getElementById('shortBreak')
    longBreak = document.getElementById('longBreak')
    alarm = document.getElementById('alarm')

    updateOffset()
  })
</script>

<Head />

<main class="flex flex-col items-center select-none">
  <h1 class="text-light-blue text-center text-3xl font-medium my-12">pomodoro</h1>

  <div class="bg-very-dark-blue text-gray-400 rounded-full p-2 grid grid-cols-3 justify-stretch whitespace-nowrap w-full max-w-[400px] h-16">
    <button id="pomodoro" class="bg-[#eb6969] text-dark-blue rounded-full font-medium focus:bg-[#eb6969] focus:text-dark-blue" on:click={selectActivity}>pomodoro</button>
    <button id="shortBreak" class="rounded-full font-medium focus:bg-[#eb6969] focus:text-dark-blue" on:click={selectActivity}>short break</button>
    <button id="longBreak" class="rounded-full font-medium focus:bg-[#eb6969] focus:text-dark-blue" on:click={selectActivity}>long break</button>
  </div>

  <button class="w-64 h-64 rounded-full mx-auto my-10 bg-gradient-to-br from-dark-blue-shadow to-light-blue-shadow shadow-neumorphism relative grid place-items-center" on:click={startPauseTimer}>
    <svg class="w-full h-full absolute" viewBox="0 0 256 256">
      <circle id="progress-bar" fill="none" stroke-width="12" stroke="#eb6969" cx="128" cy="128" r="110" stroke-dasharray="700" stroke-dashoffset="0" stroke-linecap="round" transform="rotate(-90, 128 128)"/>
    </svg>
    <div class="text-light-blue text-center grid grid-rows-3">
      <p id="label" class="text-6xl font-semibold row-start-2">{minutes}:{seconds}</p>
      <p id="status" class="row-start-3 self-center uppercase tracking-[10px] text-xs font-semibold">{running ? 'pause' : 'start'}</p>
    </div>
  </button>
  <button aria-label="Settings" class="fill-slate-400 w-5 h-5" on:click={toggleModal}>
    <SettingsIcon />
  </button>
  <audio id="alarm" src="alarm.mp3"></audio>

  <!-------- Settings modal -------->
  <div id="modal" class="hidden fixed inset-0 w-full h-full bg-transparent-black grid place-items-center px-8" on:click|self={toggleModal}>
    <div class="bg-white p-8 rounded-3xl w-full max-w-lg divide-y divide-solid">
      <div class="flex items-center justify-between gap-4 mb-4">
        <h1 class="text-3xl font-medium">Settings</h1>
        <a class="block w-8 h-8 mr-auto" href="https://github.com/tomwf/pomodoro">
          <GithubIcon />
        </a>
        <button class="fill-slate-400 w-5 h-5" on:click={toggleModal}>
          <CloseIcon />
        </button>
      </div>
      <div class="pt-4 mb-4">
        <h3 class="font-medium tracking-widest uppercase">Time (minutes)</h3>
        <div class="flex justify-between gap-4">
          <div class="">
            <label class="text-slate-400 font-medium" for="">pomodoro</label>
            <input type="number" class="block w-36 px-4 py-3 rounded-lg bg-[#f0f0fa] flex justify-between items-center" value="25" name="pomodoro" min="1" max="59" on:change={setTime}>
          </div>
          <div class="">
            <label class="text-slate-400 font-medium" for="">short break</label>
            <input type="number" class="block w-36 px-4 py-3 rounded-lg bg-[#f0f0fa] flex justify-between items-center" value="5" name="shortBreak" min="1" max="59" on:change={setTime}>
          </div>
          <div class="">
            <label class="text-slate-400 font-medium" for="">long break</label>
            <input type="number" class="block w-36 px-4 py-3 rounded-lg bg-[#f0f0fa] flex justify-between items-center" value="15" name="longBreak" min="1" max="59" on:change={setTime}>
          </div>
        </div>
      </div>
      <FontSelect />
      <ColorSelect COLORS={COLORS} activity={activity} bind:color/>
    </div>
  </div>
</main>
