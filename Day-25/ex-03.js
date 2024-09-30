function countDown(time) {
  const intervalId = setInterval(function () {
    console.log(time);
    time--;
    if (time < 0) {
      clearInterval(intervalId);
      console.log("Hết giờ!");
    }
  }, 1000);
}

countDown(10);
