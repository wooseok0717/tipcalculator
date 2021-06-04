////////////////// States ///////////////////

function Values() {
  this.beforeTip = 0;
  this.splitUpon = 1;
  this.tipPercent = 0;
  this.tip = 0;
  this.afterTip = 0;
  this.eachPerson = 0;
  this.roundUp = 'no round ups'

  this.calculate = (value = this.beforeTip) => {
    this.beforeTip = Number(value);
    if (this.roundUp === 'no round ups') {
      this.tip = this.beforeTip * this.tipPercent;
      this.afterTip = this.beforeTip + this.tip;
      this.eachPerson = this.afterTip / this.splitUpon
    } else {
      var total = Math.ceil(this.afterTip);
      var remainder = total % this.splitUpon;
      total += this.splitUpon - remainder;
      this.tip = total - this.beforeTip;
      this.afterTip = total;
      this.eachPerson = total / this.splitUpon;
    }
  }
  this.changeTip = (val) => {
    this.tipPercent = Number(val) * .01;
  }
  this.changeSplit = (val) => {
    if (val === 'Alone') {
      this.splitUpon = 1;
    } else {
      this.splitUpon = Number(val);
    }
  }
  this.changeRoundUp = (val) => {
    this.roundUp = val;
  }
};

/////////////////// View ////////////////////

function renderTotalTip(value) {
  $('#totaltip span').text(value);
};

function renderAfterTip(value) {
  $('#total span').text(value);
}

function renderEach(value) {
  $('#each span').text(value);
}

function renderPage(bill) {
  renderTotalTip(bill.tip);
  renderAfterTip(bill.afterTip);
  renderEach(bill.eachPerson);
}

///////////////// Controller //////////////////
var currentBill = new Values();

///////////////// E Listeners /////////////////

///// Tip listener /////
$('input').change(handleAmount);
$('#amount button').click(handleTip);
$('select').change(handleSplit);
$('#buttons button').click(handleButtons);

///////////////// E Handlers //////////////////

///// handle tip percentage /////
function handleAmount() {
  currentBill.calculate($('input').val());
  update();
}

function handleTip(event) {
  $('#amount button').removeClass('selected');
  event.currentTarget.classList.add('selected');
  currentBill.changeTip(event.currentTarget.value);
  update();
};

function handleSplit() {
  var val = $('select option:selected').text()
  currentBill.changeSplit(val);
  update();
}

function handleRoundUp(event) {
  currentBill.changeRoundUp(event.currentTarget.value);
  update();
}

function update() {
  currentBill.calculate();
  renderPage(currentBill);
}

function handleButtons(event) {
  $('#buttons button').removeClass('selected');
  event.currentTarget.classList.add('selected');
  currentBill.changeRoundUp(event.currentTarget.value);
  update();
}