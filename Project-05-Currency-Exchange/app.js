const API_URL = 'https://v6.exchangerate-api.com/v6/5fa15b09343aa83714c19977/latest/USD';

const POPULAR_CURRENCIES = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'MXN', 'BRL', 'KRW', 'SGD'];

const CURRENCY_NAMES = {
  USD:'US Dollar',EUR:'Euro',GBP:'British Pound',JPY:'Japanese Yen',CAD:'Canadian Dollar',
  AUD:'Australian Dollar',CHF:'Swiss Franc',CNY:'Chinese Yuan',INR:'Indian Rupee',
  MXN:'Mexican Peso',BRL:'Brazilian Real',KRW:'South Korean Won',SGD:'Singapore Dollar',
  HKD:'Hong Kong Dollar',NOK:'Norwegian Krone',SEK:'Swedish Krona',DKK:'Danish Krone',
  NZD:'New Zealand Dollar',ZAR:'South African Rand',RUB:'Russian Ruble',TRY:'Turkish Lira',
  AED:'UAE Dirham',SAR:'Saudi Riyal',QAR:'Qatari Riyal',KWD:'Kuwaiti Dinar',
  BHD:'Bahraini Dinar',OMR:'Omani Rial',PKR:'Pakistani Rupee',BDT:'Bangladeshi Taka',
  LKR:'Sri Lankan Rupee',NPR:'Nepalese Rupee',MYR:'Malaysian Ringgit',THB:'Thai Baht',
  IDR:'Indonesian Rupiah',PHP:'Philippine Peso',VND:'Vietnamese Dong',
  EGP:'Egyptian Pound',NGN:'Nigerian Naira',GHS:'Ghanaian Cedi',KES:'Kenyan Shilling',
  TZS:'Tanzanian Shilling',UGX:'Ugandan Shilling',ETB:'Ethiopian Birr',
  MAD:'Moroccan Dirham',DZD:'Algerian Dinar',TND:'Tunisian Dinar',
  ILS:'Israeli New Shekel',JOD:'Jordanian Dinar',LBP:'Lebanese Pound',
  IQD:'Iraqi Dinar',IRR:'Iranian Rial',AFN:'Afghan Afghani',
  PLN:'Polish Zloty',CZK:'Czech Koruna',HUF:'Hungarian Forint',RON:'Romanian Leu',
  BGN:'Bulgarian Lev',HRK:'Croatian Kuna',RSD:'Serbian Dinar',
  UAH:'Ukrainian Hryvnia',GEL:'Georgian Lari',AMD:'Armenian Dram',AZN:'Azerbaijani Manat',
  KZT:'Kazakhstani Tenge',UZS:'Uzbekistani Som',
  CLP:'Chilean Peso',COP:'Colombian Peso',PEN:'Peruvian Sol',ARS:'Argentine Peso',
  BOB:'Bolivian Boliviano',PYG:'Paraguayan Guaraní',UYU:'Uruguayan Peso',
  CRC:'Costa Rican Colón',GTQ:'Guatemalan Quetzal',HNL:'Honduran Lempira',
  NIO:'Nicaraguan Córdoba',DOP:'Dominican Peso',TTD:'Trinidad and Tobago Dollar',
  JMD:'Jamaican Dollar',BBD:'Barbadian Dollar',
};

const CURRENCY_FLAGS = {
  USD:'🇺🇸',EUR:'🇪🇺',GBP:'🇬🇧',JPY:'🇯🇵',CAD:'🇨🇦',AUD:'🇦🇺',CHF:'🇨🇭',CNY:'🇨🇳',
  INR:'🇮🇳',MXN:'🇲🇽',BRL:'🇧🇷',KRW:'🇰🇷',SGD:'🇸🇬',HKD:'🇭🇰',NOK:'🇳🇴',SEK:'🇸🇪',
  DKK:'🇩🇰',NZD:'🇳🇿',ZAR:'🇿🇦',RUB:'🇷🇺',TRY:'🇹🇷',AED:'🇦🇪',SAR:'🇸🇦',
  QAR:'🇶🇦',KWD:'🇰🇼',BHD:'🇧🇭',OMR:'🇴🇲',PKR:'🇵🇰',BDT:'🇧🇩',LKR:'🇱🇰',
  NPR:'🇳🇵',MYR:'🇲🇾',THB:'🇹🇭',IDR:'🇮🇩',PHP:'🇵🇭',VND:'🇻🇳',EGP:'🇪🇬',
  NGN:'🇳🇬',GHS:'🇬🇭',KES:'🇰🇪',TZS:'🇹🇿',UGX:'🇺🇬',ETB:'🇪🇹',MAD:'🇲🇦',
  DZD:'🇩🇿',TND:'🇹🇳',ILS:'🇮🇱',JOD:'🇯🇴',LBP:'🇱🇧',IQD:'🇮🇶',IRR:'🇮🇷',
  AFN:'🇦🇫',PLN:'🇵🇱',CZK:'🇨🇿',HUF:'🇭🇺',RON:'🇷🇴',BGN:'🇧🇬',UAH:'🇺🇦',
  GEL:'🇬🇪',AMD:'🇦🇲',AZN:'🇦🇿',KZT:'🇰🇿',UZS:'🇺🇿',CLP:'🇨🇱',COP:'🇨🇴',
  PEN:'🇵🇪',ARS:'🇦🇷',BOB:'🇧🇴',PYG:'🇵🇾',UYU:'🇺🇾',CRC:'🇨🇷',GTQ:'🇬🇹',
  HNL:'🇭🇳',NIO:'🇳🇮',DOP:'🇩🇴',TTD:'🇹🇹',JMD:'🇯🇲',BBD:'🇧🇧',
};

let ratesData   = null;
let allCurrencies = [];
let sortConfig  = { col: 'code', dir: 'asc' };
let searchQuery = '';

const amountFrom   = document.getElementById('amountFrom');
const amountTo     = document.getElementById('amountTo');
const currencyFrom = document.getElementById('currencyFrom');
const currencyTo   = document.getElementById('currencyTo');
const flagFrom     = document.getElementById('flagFrom');
const flagTo       = document.getElementById('flagTo');
const rateInfoFrom = document.getElementById('rateInfoFrom');
const rateInfoTo   = document.getElementById('rateInfoTo');
const rateDisplay  = document.getElementById('rateDisplay');
const rateTimestamp= document.getElementById('rateTimestamp');
const swapBtn      = document.getElementById('swapBtn');
const refreshBtn   = document.getElementById('refreshBtn');
const ratesSearch  = document.getElementById('ratesSearch');
const ratesTableBody = document.getElementById('ratesTableBody');
const popularGrid  = document.getElementById('popularGrid');
const tableFooter  = document.getElementById('tableFooter');
const tickerTrack  = document.getElementById('tickerTrack');
const headerDate   = document.getElementById('headerDate');
const statInverse  = document.getElementById('statInverse');
const statBase     = document.getElementById('statBase');
const statTotal    = document.getElementById('statTotal');
const statUpdated  = document.getElementById('statUpdated');

document.addEventListener('DOMContentLoaded', () => {
  setHeaderDate();
  fetchRates();
  setInterval(fetchRates, 60000); 
});

function setHeaderDate() {
  const now = new Date();
  headerDate.textContent = now.toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  }).toUpperCase();
}

async function fetchRates() {
  try {
    refreshBtn.classList.add('spinning');
    const res  = await fetch(API_URL);
    const data = await res.json();
    if (data.result !== 'success') throw new Error('API error');

    ratesData = data.conversion_rates;
    allCurrencies = Object.keys(ratesData).sort();

    populateSelects();
    renderPopularRates();
    renderTable();
    buildTicker();
    updateStats(data);
    convert();

    rateTimestamp.textContent = `Updated ${new Date().toLocaleTimeString()}`;
  } catch (err) {
    rateDisplay.textContent = '⚠ Failed to fetch rates. Retrying...';
    console.error(err);
  } finally {
    refreshBtn.classList.remove('spinning');
  }
}
function populateSelects() {
  const fromVal = currencyFrom.value || 'USD';
  const toVal   = currencyTo.value   || 'PKR';

  [currencyFrom, currencyTo].forEach((sel, idx) => {
    const saved = idx === 0 ? fromVal : toVal;
    sel.innerHTML = allCurrencies.map(code => {
      const name = CURRENCY_NAMES[code] || code;
      return `<option value="${code}" ${code === saved ? 'selected' : ''}>${code} : ${name}</option>`;
    }).join('');
  });

  updateFlags();
}

function convert() {
  if (!ratesData) return;

  const from   = currencyFrom.value;
  const to     = currencyTo.value;
  const amount = parseFloat(String(amountFrom.value).replace(/,/g, '')) || 0;

  const rateFrom = ratesData[from]; 
  const rateTo   = ratesData[to];   

  if (!rateFrom || !rateTo) return;

  const crossRate = rateTo / rateFrom;   
  const result    = amount * crossRate;
  const inverse   = rateFrom / rateTo;   

  amountTo.value = formatInput(result);

  rateDisplay.textContent = `1 ${from} = ${formatPrecise(crossRate)} ${to}`;

  rateInfoFrom.textContent = `1 ${from} = ${formatPrecise(crossRate)} ${to}`;
  rateInfoTo.textContent   = `1 ${to} = ${formatPrecise(inverse)} ${from}`;

  statInverse.textContent = formatPrecise(inverse);
  statBase.textContent    = from;

  updateFlags();
}

function convertReverse() {
  if (!ratesData) return;

  const from   = currencyFrom.value;
  const to     = currencyTo.value;
  const amount = parseFloat(String(amountTo.value).replace(/,/g, '')) || 0;

  const rateFrom = ratesData[from];
  const rateTo   = ratesData[to];

  if (!rateFrom || !rateTo) return;

  const crossRate = rateFrom / rateTo;  
  const result    = amount * crossRate;
  const inverse   = rateTo / rateFrom;

  amountFrom.value = formatInput(result);

  rateDisplay.textContent  = `1 ${to} = ${formatPrecise(crossRate)} ${from}`;
  rateInfoFrom.textContent = `1 ${from} = ${formatPrecise(inverse)} ${to}`;
  rateInfoTo.textContent   = `1 ${to} = ${formatPrecise(crossRate)} ${from}`;

  statInverse.textContent = formatPrecise(inverse);
  statBase.textContent    = from;

  updateFlags();
}

function formatInput(val) {
  if (!isFinite(val) || isNaN(val)) return '0';
  if (val === 0) return '0';
  if (val >= 100)   return parseFloat(val.toFixed(2)).toString();
  if (val >= 1)     return parseFloat(val.toFixed(4)).toString();
  return parseFloat(val.toFixed(8)).toString();
}

function formatPrecise(val) {
  if (!isFinite(val) || isNaN(val)) return '0';
  if (val >= 10000) return val.toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (val >= 100)   return val.toFixed(2);
  if (val >= 1)     return val.toFixed(4);
  return val.toFixed(6);
}
function updateFlags() {
  flagFrom.textContent = CURRENCY_FLAGS[currencyFrom.value] || '🌐';
  flagTo.textContent   = CURRENCY_FLAGS[currencyTo.value]   || '🌐';
}

swapBtn.addEventListener('click', () => {
  const temp = currencyFrom.value;
  currencyFrom.value = currencyTo.value;
  currencyTo.value   = temp;
  convert();
});

refreshBtn.addEventListener('click', fetchRates);

amountFrom.addEventListener('input', () => { convert(); });
amountTo.addEventListener('input',   () => { convertReverse(); });
currencyFrom.addEventListener('change', () => { updateFlags(); convert(); });
currencyTo.addEventListener('change',   () => { updateFlags(); convert(); });

document.querySelectorAll('.pill-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    amountFrom.value = btn.dataset.val;
    convert();
  });
});

function renderPopularRates() {
  popularGrid.innerHTML = POPULAR_CURRENCIES.map(code => {
    const rate = ratesData[code];
    if (!rate) return '';
    const name = CURRENCY_NAMES[code] || code;
    const flag = CURRENCY_FLAGS[code] || '🌐';
    return `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="popular-card" data-code="${code}" onclick="usePopularCurrency('${code}')">
          <div class="popular-flag">${flag}</div>
          <div class="popular-code">${code}</div>
          <div class="popular-name">${name}</div>
          <div class="popular-rate">${formatPrecise(rate)}</div>
        </div>
      </div>
    `;
  }).join('');
}

window.usePopularCurrency = function(code) {
  currencyTo.value = code;
  updateFlags();
  convert();
  document.querySelector('.converter-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
};

function renderTable() {
  let list = allCurrencies.map(code => ({
    code,
    name: CURRENCY_NAMES[code] || '—',
    rate: ratesData[code]
  }));

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(r =>
      r.code.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q)
    );
  }

  list.sort((a, b) => {
    let va = a[sortConfig.col];
    let vb = b[sortConfig.col];
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return sortConfig.dir === 'asc' ? -1 : 1;
    if (va > vb) return sortConfig.dir === 'asc' ? 1 : -1;
    return 0;
  });

  ratesTableBody.innerHTML = list.map(r => `
    <tr>
      <td><span class="table-code">${r.code}</span></td>
      <td><span class="table-name">${r.name}</span></td>
      <td><span class="table-rate">${formatPrecise(r.rate)}</span></td>
      <td><button class="use-btn" onclick="useCurrencyInConverter('${r.code}')">USE →</button></td>
    </tr>
  `).join('') || `<tr><td colspan="4" style="text-align:center;padding:30px;color:var(--grey-600);font-family:var(--font-mono);font-size:12px;">No currencies found for "${searchQuery}"</td></tr>`;

  tableFooter.textContent = `SHOWING ${list.length} OF ${allCurrencies.length} CURRENCIES`;
  statTotal.textContent   = allCurrencies.length;
}
window.useCurrencyInConverter = function(code) {
  currencyTo.value = code;
  updateFlags();
  convert();
  document.querySelector('.converter-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
};
document.querySelectorAll('.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (sortConfig.col === col) {
      sortConfig.dir = sortConfig.dir === 'asc' ? 'desc' : 'asc';
    } else {
      sortConfig.col = col;
      sortConfig.dir = 'asc';
    }
    document.querySelectorAll('.sort-icon').forEach(i => { i.className = 'bi bi-chevron-expand sort-icon'; });
    th.querySelector('.sort-icon').className = `bi bi-chevron-${sortConfig.dir === 'asc' ? 'up' : 'down'} sort-icon`;
    renderTable();
  });
});

ratesSearch.addEventListener('input', () => {
  searchQuery = ratesSearch.value.trim();
  renderTable();
});
function updateStats(data) {
  const ts = new Date(data.time_last_update_unix * 1000);
  statUpdated.textContent = ts.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
function buildTicker() {
  const items = POPULAR_CURRENCIES
    .filter(c => ratesData[c])
    .map(c => `<span class="ticker-item">USD/${c} · ${formatPrecise(ratesData[c])}</span>`)
    .join('');
  tickerTrack.innerHTML = items + items;
}