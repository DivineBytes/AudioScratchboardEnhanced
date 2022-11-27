
function EditPanel()
{
	var self = this;
	this.shape = null;
	this.panel = document.getElementById('edit-panel');
	this.panel.addEventListener('mousedown', function(e) { e.preventDefault(); e.stopPropagation(); return false; }, false );
	this.panel.addEventListener('mouseup', function(e) { e.preventDefault(); e.stopPropagation(); return false;}, false );
	
	this.btnClose = document.getElementById('close');
	this.btnClose.addEventListener('mousedown', function(e) { e.preventDefault(); e.stopPropagation(); deselectShape(); return false; }, false );
	
	this.btnDelete = document.getElementById('delete');
	this.btnDelete.addEventListener('mousedown', function(e) {
		e.preventDefault(); e.stopPropagation();
		if( !self.shape ) return;
		self.shape.hasBeenRemoved = true;
		deselectShape(); 
	    return false;
	 }, false );
	
	this.btnMoveLeft = document.getElementById('move-left');
	this.btnMoveRight = document.getElementById('move-right');
	this.btnMoveUp = document.getElementById('move-up');
	this.btnMoveDown = document.getElementById('move-down');
	
	this.btnRotateUp = document.getElementById('rotate-up');
	this.btnRotateDown = document.getElementById('rotate-down');
	
	this.btnScaleUp = document.getElementById('scale-up');
	this.btnScaleDown = document.getElementById('scale-down');
	
	this.show = function() { this.panel.style.display = 'block';  lockedDrawing = true; }
	this.hide = function() { this.panel.style.display = 'none';  lockedDrawing = false; }
	
	
	this.move = function( x, y )
	{
		if( !this.shape ) return;
		// adjust all points by x,y
		this.shape.translate( x, y );
		shapeList.updateAutosave();
	}
	
	this.rotate = function( r )
	{
		if( !this.shape ) return;
		// adjust all points by x,y
		this.shape.rotate( r * Math.PI / 180 );
		shapeList.updateAutosave();
	}
	
	this.scale = function( s )
	{
		if( !this.shape ) return;
		// adjust all points by x,y
		this.shape.scale( s, s );
		shapeList.updateAutosave();
	}
	
	var self = this;
	holdit( this.btnMoveLeft, function() {self.move( -1, 0 );} , 300, 1.1 );
	holdit( this.btnMoveRight, function() {self.move( 1, 0 );} , 300, 1.1 );
	holdit( this.btnMoveUp, function() {self.move( 0, -1 );} , 300, 1.1 );
	holdit( this.btnMoveDown, function() {self.move( 0, 1 );} , 300, 1.1 );
	
	holdit( this.btnRotateUp, function() {self.rotate(-1);} , 300, 1.1 );
	holdit( this.btnRotateDown, function() {self.rotate(1);} , 300, 1.1 );
	
	holdit( this.btnScaleUp, function() {self.scale(1.01);} , 300, 1.1 );
	holdit( this.btnScaleDown, function() {self.scale(1/1.01);} , 300, 1.1 );
	
	
	function holdit(btn, action, start, speedup) {
	    var t;
		var originalStart = start;
	    var repeat = function () {
	        action();
	        t = setTimeout(repeat, start);
	        start = start / speedup;
	        if( start < 30 ) start = 30;
	    }

	    btn.addEventListener('mousedown',function(e) {
			e.stopPropagation();
			e.preventDefault();
			start = originalStart;
	        repeat();
	        return false;
	    },false);

	    btn.addEventListener('mouseup',function (e) {
			e.stopPropagation();
			e.preventDefault();
	        clearTimeout(t);
	        return false;
	    },false);

	    btn.addEventListener('mouseout',function (e) {
			e.stopPropagation();
			e.preventDefault();
	        clearTimeout(t);
	        return false;
	    },false);
	};
	
}