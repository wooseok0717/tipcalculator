////////////////// States ///////////////////

function Split() {
  this.total = 0;
  this.splitUpon = 2;
  this.prepaid = 0;
  this.cards = 2;
  this.payingFor = 1;
  this.eachPerson = 0;
  this.cardPays = 0;
  this.cardGets = 0;

  this.calculate = (value = this.total) => {
    this.total = Number(value);
    this.eachPerson = this.total / this.splitUpon;
    this.cardPays = (this.total - this.prepaid) / this.cards;
    this.cardGets = this.cardPays - this.eachPerson * this.payingFor
  }
  this.changeSplit = (value) => {
    this.splitUpon = Number(value);
  }
  this.changePrepaid = (value) => {
    this.prepaid = Number(value);
  }
  this.changeCards = (value) => {
    this.cards = Number(value);
  }
  this.changePayFor = (value) => {
    this.payingFor = Number(value);
  }
}

/////////////////// View ////////////////////
function renderEach(value) {
  $('#eachperson span').text(value);
}

function renderCardPays(value) {
  $('#cardholder span').text(value);
}

function renderCardGets(value) {
  $('#receive span').text(value);
}

function renderPage(bill) {
  renderEach(bill.eachPerson);
  renderCardPays(bill.cardPays);
  renderCardGets(bill.cardGets);
}


///////////////// Controller //////////////////
var currentSplit = new Split();

///////////////// E Listeners /////////////////
$('#bill').change(handleTotal);
$('#split').change(handleSplit);
$('#cash').change(handlePrepaid);
$('#cards').change(handleCards);
$('#payingfor button').click(handlePayingFor);


///////////////// E Handlers //////////////////

function handleTotal() {
  currentSplit.calculate($('#bill').val());
  update();
}

function handleSplit() {
  var value = $('#split option:selected').text();
  currentSplit.changeSplit(value);
  update();
}

function handlePrepaid() {
  currentSplit.changePrepaid($('#cash').val());
  update();
}

function handleCards() {
  var value = $('#cards option:selected').text();
  currentSplit.changeCards(value);
  update();
}

function handlePayingFor(event) {
  $('#payingfor button').removeClass('selectedpink');
  event.currentTarget.classList.add('selectedpink');
  currentSplit.changePayFor(event.currentTarget.value);
  update();
}

function update() {
  currentSplit.calculate();
  renderPage(currentSplit);
}