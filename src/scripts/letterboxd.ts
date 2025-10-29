const btns = document.querySelectorAll<HTMLElement>('.toggles button')
const btnBg = document.querySelector<HTMLElement>('.toggles .bg')
const contBlog = document.querySelector<HTMLElement>('#container #blogs')
const contLetter = document.querySelector<HTMLElement>('#container #letterboxd')
const btnPadd = 5


function updateBg(target:HTMLElement|null) {
  const rec = target!.getBoundingClientRect()
  const contRec = target!.parentElement?.getBoundingClientRect()

  btnBg!.style.width = `${rec.width + ( btnPadd * 2 )}px`
  btnBg!.style.left = `${rec.left - contRec!.left - btnPadd}px`
}

function activateBtn(btn:HTMLElement|null) {
  btns.forEach(b => b.classList.remove('active'))
  btn!.classList.add('active')
  updateBg(btn)

  const isLetterboxd = btn!.classList.contains('letterboxd')

  contBlog!.classList.toggle('active', !isLetterboxd)
  contLetter!.classList.toggle('active', isLetterboxd)
  history.replaceState(null, '', isLetterboxd ? '/#letterboxd' : '/')
}


const initHash = location.hash
let initBtn = document.querySelector<HTMLElement>('.toggles button.active')
if (initHash === '#letterboxd') {
  initBtn = document.querySelector<HTMLElement>('.toggles button.letterboxd')
} else {
  initBtn = document.querySelector<HTMLElement>('.toggles button.blogs')
}
activateBtn(initBtn)


btns.forEach(btn => {
  btn.addEventListener('click', () => activateBtn(btn))
})