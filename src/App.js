import React, { Component } from 'react';
import {Row, Col} from 'jsxstyle';
import RootLayer from './react-layers/RootLayer';
import ModalClickTrigger from './react-layers/ModalClickTrigger';
import HovercardHoverTrigger from './react-layers/HovercardHoverTrigger';

function Hovercard() {
  return (
    <Col background="white" border="1px solid rgba(0,0,0,0.2)" padding="10px 20px">
      <p>
	This is my hovercard. If you scroll or resize the viewporrt, the hovercard
	will stay tethered to the target.
      </p>
      <p>
	Additionally, you can move your mouse off of the hovercard or target, and the
	hovercard will disappear after a short delay. You can also press ESC to remove the hovercard.
      </p>
      <p>
	<a href="javascript:;">Links</a> <a href="javascript:;">in</a> <a href="javascript:;">the</a> <a href="javascript:;">hovercard</a> have their focused managed correctly, of course.
      </p>
      <p>
	Finally, you can trigger the hoverstate by focusing the target and pressing spacebar. Notice that when the hovercard closes, focus is returned to the target.
      </p>
    </Col>
  );
}

function ModalBackdrop({style, children}) {
  return (
    <div style={{background: 'rgba(0,0,0,0.8)', ...style}}>
      {children}
    </div>
  );
}

function Modal({num}) {
  return (
    <Col background="white" width={640} borderRadius={5} padding="10px 20px">
      <h1>This is modal {num}</h1>
      <p>
	Note that <a href="javascript:;">the first link is focused by default</a>, and if you were to close this modal by pressing ESC, focus would return to the link you originally clicked.
      </p>
      <p>
      Additionally, this modal has <a href="javascript:;">several</a> <a href="javascript:;">more</a> <a href="javascript:;">links</a>, and if you were to tab through them all, focus would stay within the modal, and you would not tab through the links in the previous layer.
      </p>
      <p>
      You can also{' '}
      <ModalClickTrigger modal={<Modal num={num + 1} />} backdrop={ModalBackdrop}>
      open another copy of this modal
    </ModalClickTrigger>
      {' '}and observe that focus continues to work, the ESC key closes the correct modal, etc.
      </p>
      <p>
      When building layered user interfaces with this library, you should never use z-index; react-layers will manage it for you. You also don't need to worry about positioning relative items like hovercards anymore;{' '}
      <HovercardHoverTrigger hovercard={<Hovercard />}>hover me</HovercardHoverTrigger>
      {' '}to see an example.
      </p>
    </Col>
  );
}

class App extends Component {
  render() {
    return (
      <RootLayer>
	<h1>react-layers</h1>
	<section>
	  react-layers is a library for accessible <i>layered</i> user interfaces on desktop browsers. It provides
	  composable abstractions for:
	</section>
	<ul>
	  <li>Managing focus</li>
	  <li>Managing hotkeys</li>
	  <li>Managing z-index</li>
	  <li>Relative item positioning</li>
	</ul>
	<section>
	  It is based on Facebook's internal abstractions but re-implemented in React.
	  This is an interactive demo, and to fully appreciate it I suggest only using the keyboard to navigate.
	</section>
	<section>
	  Tab through <a href="https://www.google.com/">each</a> of <a href="https://www.facebook.com/">these</a> <a href="https://www.smyte.com/">links</a> and {' '}
	  <ModalClickTrigger modal={<Modal num={1} />} backdrop={ModalBackdrop}>
	    press enter to open a modal.
	  </ModalClickTrigger>
	</section>	
      </RootLayer>
    );
  }
}

export default App;
