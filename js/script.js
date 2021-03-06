$(document).ready(function () {
  var $body = $('body')
  var $header = $('header')
  var $wordPanel = $('.wordPanel')
  var $colorPanel = $('.colorPanel')
  var $miscPanel = $('.miscPanel')
  var $timerPanel = $('.timer')
  var $scorePanel = $('.score')
  var $startButton = $('.start')
  var $restartButton = $('.restart')

  var colorArr = ['red', 'blue', 'yellow', 'green']
  var wordArr = ['GREEN', 'YELLOW', 'RED', 'BLUE']
  var timerID
  var score
  var seconds
  $restartButton.hide()
  $wordPanel.children().hide()
  $startButton.on('click', startClick)

  // Shuffle the array
  function shuffle(array) {
    var i = 0
    var j = 0
    var temp = null
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  // Executes the functions after the "Start" button is clicked
  function startClick() {
    generateWord()
    generateColor()
    timerStart()
    startScore()
    $('.colorPanel').on('click', '.box', matcher)
    $startButton.hide()
    $restartButton.show()
    $wordPanel.show()
    $colorPanel.show()
    $restartButton.on('click', restartClick)
  }

  // Executes the functions after the "Restart" button is clicked
  function restartClick() {
    timerReset()
    $restartButton.hide()
    $startButton.show()
    $wordPanel.children().remove()
    $colorPanel.children().remove()
    $wordPanel.children().hide()
    $colorPanel.children().hide()
  }

  // Shuffle words and add color class
  function generateWord() {
    var shuffleWord = shuffle(wordArr)
    $wordPanel.append('<div class="word red">' + shuffleWord[0] + '</div>')
  }

  // Shuffle colors and add color class
  function generateColor() {
    var shuffleColor = shuffle(colorArr)
    for (var i = 0; i < shuffleColor.length; i++) {
      $colorPanel.append('<div class="box ' + shuffleColor[i] + '"></div>')
    }
  }

  // Randomise words
  function randomWord() {
    var shuffleWord = shuffle(wordArr)
    var shuffleColor = shuffle(colorArr)
    var $wordChildren = $wordPanel.children()
    $wordChildren.remove()
    $wordPanel.append('<div class="word ' + shuffleColor[0] + '">' + shuffleWord[0] + '</div>')
  }

  // Randomise colors
  function randomColor() {
    var shuffleColor = shuffle(colorArr)
    var $colorChildren = $colorPanel.children()
    for (var i = 0; i < shuffleColor.length; i++) {
      $colorChildren.remove()
      $colorPanel.append('<div class="box ' + shuffleColor[i] + '"></div>')
    }
  }

  // Matching utility
  function matcher() {
    var $wordChildren = $wordPanel.children()
    if ($(this).css('background-color') === $wordChildren.css('color')) {
      randomWord()
      randomColor()
      addScore()
    }
  }

  //**************************
  // Timer Utilities
  //**************************

  function timerCount() {
    seconds -= 1
    $timerPanel.text(seconds + 's')
    if (seconds === 0) {
      timerEnd()
      swal({
        title: "TIME UP!",
        text: "Great! You scored " + score + ".",
        showConfirmButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        allowEnterKey: false,
        confirmButtonText: "OK",
        confirmButtonColor: "#28a745"
      }).then(function () {
        $restartButton.hide()
        $startButton.show()
        $wordPanel.children().remove()
        $colorPanel.children().remove()
        $wordPanel.children().hide()
        $colorPanel.children().hide()
      })
    }
  }

  // Start timer from 30s and decrease to 0s by timerCount()
  function timerStart() {
    seconds = 30
    $timerPanel.text(seconds + 's')
    timerID = setInterval(timerCount, 1000)
  }

  // Set timer to 30s
  function timerReset() {
    clearInterval(timerID)
    seconds = 30
    $timerPanel.text(seconds + 's')
  }

  // Set timer to 0s
  function timerEnd() {
    clearInterval(timerID)
    seconds = 0
    $timerPanel.text(seconds + 's')
  }

  //**************************
  // Scoring Utilities
  //**************************

  // Set score to 0
  function startScore() {
    score = 0
    $scorePanel.text(score)
  }

  // Add score by 1
  function addScore() {
    score += 1
    $scorePanel.text(score)
  }
})
