<script>
  function selectFont(e) {
    const target = e.target
    const prevSelectedBtn = document.getElementById(font)

    // Highlight font buttons
    target.classList.add('bg-black', 'text-white')
    target.classList.remove('bg-[#f0f0fa]', 'text-slate-400')
    prevSelectedBtn.classList.add('bg-[#f0f0fa]', 'text-slate-400')
    prevSelectedBtn.classList.remove('bg-black', 'text-white')

    // Apply font family on body
    document.body.style.fontFamily = FONTS[target.id]

    // Remember selected font
    font = target.id
  }

  const FONTS = {
    rubik: 'Rubik',
    serif: 'Noto Serif Display',
    mono: 'Roboto Mono'
  }
  let font = Object.keys(FONTS)[0]
</script>

<div class="flex items-center justify-between gap-4 pt-4 my-4">
  <h3 class="font-medium tracking-widest uppercase">Font</h3>
  <button id="rubik" class="ml-auto rounded-full bg-black block w-12 h-12 text-white font-medium" on:click={selectFont}>Aa</button>
  <button id="serif" class="rounded-full bg-[#f0f0fa] block w-12 h-12 text-slate-400 font-medium font-serif" on:click={selectFont}>Aa</button>
  <button id="mono" class="rounded-full bg-[#f0f0fa] block w-12 h-12 text-slate-400 font-medium font-mono" on:click={selectFont}>Aa</button>
</div>
