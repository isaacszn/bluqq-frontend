document.querySelector('#next-1').addEventListener('click', () => {
  document.querySelector('.first-phase').classList.remove('d-f')
  document.querySelector('.first-phase').classList.add('d-n')
  document.querySelector('.second-phase').classList.remove('d-n')
  document.querySelector('.second-phase').classList.add('d-f')
})

document.querySelector('#next-2').addEventListener('click', () => {
  document.querySelector('.second-phase').classList.remove('d-f')
  document.querySelector('.second-phase').classList.add('d-n')
  document.querySelector('.third-phase').classList.remove('d-n')
  document.querySelector('.third-phase').classList.add('d-f')
})

document.querySelector('#next-3').addEventListener('click', () => {
  document.querySelector('.third-phase').classList.remove('d-f')
  document.querySelector('.third-phase').classList.add('d-n')
  document.querySelector('.last-phase').classList.remove('d-n')
  document.querySelector('.last-phase').classList.add('d-f')
})

document.querySelector('.prev-1').addEventListener('click', () => {
  document.querySelector('.first-phase').classList.remove('d-n')
  document.querySelector('.first-phase').classList.add('d-f')
  document.querySelector('.second-phase').classList.remove('d-f')
  document.querySelector('.second-phase').classList.add('d-n')
})

document.querySelector('.prev-2').addEventListener('click', () => {
  document.querySelector('.third-phase').classList.remove('d-f')
  document.querySelector('.third-phase').classList.add('d-n')
  document.querySelector('.second-phase').classList.remove('d-n')
  document.querySelector('.second-phase').classList.add('d-f')
})

document.querySelector('.prev-3').addEventListener('click', () => {
  document.querySelector('.last-phase').classList.remove('d-f')
  document.querySelector('.last-phase').classList.add('d-n')
  document.querySelector('.third-phase').classList.remove('d-n')
  document.querySelector('.third-phase').classList.add('d-f')
})