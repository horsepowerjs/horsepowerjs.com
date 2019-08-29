import * as url from 'url'

let overviewNav = document.querySelector('#overview-nav')
let masterNav = document.querySelector('#master-nav')
if (overviewNav) {
  let tags = [...document.querySelectorAll('#main-content h1, #main-content h2, #main-content h3, #main-content h4, #main-content h5,#main-content h6')]
  let items = tags.map(i => `<li class="nav-${i.tagName.toLowerCase()}"><a href="#${i.textContent.toLowerCase().replace(/\s/g, '-')}">${i.textContent}</a></li>`)

  tags.forEach(tag => {
    let a = document.createElement('a')
    a.name = tag.textContent.toLowerCase().replace(/\s/g, '-')
    tag.insertAdjacentElement('beforebegin', a)
  })

  let ul = document.createElement('ul')
  overviewNav.appendChild(ul)
  ul.innerHTML = items.join('')
}

if (masterNav) {
  [...masterNav.querySelectorAll('a.header')].forEach((aEl, idx, items) => {
    if (new RegExp(aEl.getAttribute('pattern') || '').test(window.location.pathname)) {
      aEl.parentElement.classList.add('visible')
    }
    [...aEl.parentElement.querySelectorAll('ul>li>a')].forEach(el => {
      if (url.parse(el.href).pathname == window.location.pathname) {
        el.insertAdjacentHTML('beforebegin', '<span class="fa-li fa-xs"><i class="fa-xs fas fa-circle"></i></span>')
        el.parentElement.classList.add('selected')
      }
    })
    aEl.addEventListener('click', e => {
      e.preventDefault()
      items.forEach(cur => cur != aEl && cur.parentElement.classList.remove('visible'))
      aEl.parentElement.classList.toggle('visible')
    })
  })
}