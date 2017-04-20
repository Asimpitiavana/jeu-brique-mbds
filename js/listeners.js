function gameKeyPressed(evt) {
  switch(evt.key) {
    case 'n' :
//	  location.reload();
      jeu.restart();
      break;
	case ' ' :
      jeu.pause();
      break;
  }
}
function handleVisibilityChange() {
  if (document.hidden) {
    jeu.pause();
  } else  {
    jeu.pause();
  }
}
	
function addEcouteurs() {
  canvas.addEventListener('mousemove', jeu.move);
  window.addEventListener('keydown', gameKeyPressed);		
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
}  