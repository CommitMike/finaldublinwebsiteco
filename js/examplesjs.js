const demos = [
  {
    name: 'Prestige Motors Dublin',
    industry: 'Automotive',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example1/index.html',
    live: true
  },
  {
    name: 'Malones Garage',
    industry: 'Automotive',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example2/index.html',
    live: true
  },
   {
    name: "Luxe Core",
    industry: 'Ecommerce',
    pkg: 'Ecommerce',
    img: 'https://images.unsplash.com/photo-1577640613079-a6052668884f?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example3/index.html',
    live: true
  },
  {
    name: "The Dublin Larder",
    industry: 'Ecommerce',
    pkg: 'Ecommerce',
    img: 'https://images.unsplash.com/photo-1779551246024-ad86e5634f4f?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example4/index.html',
    live: true
  },
  {
    name: "Apex Physio & Rehab",
    industry: 'Health',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1669316714681-5fe047de58b1?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example5/index.html',
    live: true
  },
  {
    name: "Stillwater Therapy",
    industry: 'Health',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1551847677-dc82d764e1eb?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example6/index.html',
    live: true
  },
  {
    name: 'The Copper Kettle Café',
    industry: 'Hospitality',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example7/index.html',
    live: true
  },
  {
    name: 'Stems & Grounds',
    industry: 'Hospitality',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example8/index.html',
    live: true
  },
  {
    name: 'Ember & Vine',
    industry: 'Hospitality',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example9/index.html',
    live: true
  },
  {
    name: 'Chopstix Takeaway',
    industry: 'Hospitality',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example10/index.html',
    live: true
  },
  {
    name: 'Slice & Co. Pizzeria',
    industry: 'Hospitality',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example11/index.html',
    live: true
  },
  {
    name: 'The Barber Block',
    industry: 'Services',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example12/index.html',
    live: true
  },
  {
    name: 'Sudsy Launderette',
    industry: 'Services',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example13/index.html',
    live: true
  },
  {
    name: 'ClearFlow Plumbing',
    industry: 'Trades',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1676210134188-4c05dd172f89?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example14/index.html',
    live: true
  },
  {
    name: 'Volt & Sons Electrical',
    industry: 'Trades',
    pkg: 'Starter',
    img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80',
    url: 'example-websites/example15/index.html',
    live: true
  },
];

const delays = ['d1','d2','d3','d4','d5','d6'];
const filters = ['All', ...new Set(demos.map(d => d.industry))];
let active = 'All';

function render() {
  // filters
  document.getElementById('filters').innerHTML = filters.map(x =>
    `<button class="filter-btn${x === active ? ' active' : ''}" data-f="${x}">${x}</button>`
  ).join('');
  document.querySelectorAll('.filter-btn').forEach(b =>
    b.addEventListener('click', () => { active = b.dataset.f; render(); })
  );

  // cards
  const list = demos.filter(d => active === 'All' || d.industry === active);
  document.getElementById('grid').innerHTML = list.map((d, i) => `
    <article class="demo-card reveal ${delays[i] || ''}" onclick="${d.live ? `window.open('${d.url}','_blank')` : ''}">
      <div class="card-img">
        <img src="${d.img}" alt="${d.name}" loading="lazy">
        <div class="card-img-overlay"></div>
        <span class="card-pill ${d.live ? 'pill-live' : 'pill-soon'}">${d.live ? 'Live Demo' : 'Coming Soon'}</span>
        <span class="card-cat">${d.industry}</span>
      </div>
      <div class="card-body">
        <div class="card-name">${d.name}</div>
        <div class="card-footer">
          <span class="card-pkg">${d.pkg}</span>
          ${d.live
            ? `<a href="${d.url}" target="_blank" rel="noopener" class="card-link" onclick="event.stopPropagation()">View demo <span class="card-link-arrow">→</span></a>`
            : `<span class="card-link disabled">Coming soon</span>`
          }
        </div>
      </div>
    </article>
  `).join('');

  // re-observe new cards
  document.querySelectorAll('.reveal:not(.in)').forEach(el => observer.observe(el));
}

// scroll reveals
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// nav scroll
window.addEventListener('scroll', () =>
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 20)
);

render();