
function listMenu( id, icon, label, parent )
{
	this.id = id;
	this.x = 0;
	this.y = 0;
	
	this.onClick = null;
	this.visible = true;
	
	this.parentElement = parent || null;
	this.childElements = [];
	
	if( !parent ) {
		this.realRootElement = document.createElement( 'ul' );
		this.realRootElement.className = 'menu';
	}
	this.rootElement = document.createElement( 'li' );
	this.subElements = document.createElement( 'ul' );
	this.subElements.className = 'menu';
	this.labelElement = document.createElement( 'span' );
	this.labelElement.className = 'menu-label';
	this.iconElement = document.createElement( 'span' );
	this.iconElement.className = 'menu-icon';
	
	
	if( icon ) {
		this.iconElement.style.background = 'url("' + icon + '"),  #888';
		this.iconElement.style.backgroundPosition = 'center center';
		this.iconElement.style.backgroundRepeat = 'no-repeat';
	}
	if( label ) {
		this.labelElement.innerHTML = label;
	}
	if( !parent ) {
		this.rootElement.appendChild( this.iconElement );
		this.rootElement.appendChild( this.labelElement );
		this.rootElement.appendChild( this.subElements );
		this.realRootElement.appendChild( this.rootElement );
		document.body.appendChild( this.realRootElement );
	}
	else {
		this.rootElement.appendChild( this.iconElement );
		this.rootElement.appendChild( this.labelElement );
		this.rootElement.appendChild( this.subElements );
		document.body.appendChild( this.rootElement );
	}
	
	var self = this;
	this.rootElement.onmouseover = function(e) { self.mouseover(e); }
	this.rootElement.onmouseout = function(e) { self.mouseout(e); }
	this.rootElement.onclick = function(e) { if( self.onClick) self.onClick(e,self); }
	
	this.show = function() { this.rootElement.style.display = 'block'; this.visible = true; }
	this.hide = function(recurse) { 
		recurse = recurse || false;
		delayedMenuHide.cancel();
		this.rootElement.style.display = 'none'; 
		if( recurse ) {
			for( var i = 0; i < this.childElements.length; i++ ) {
				this.childElements[i].hide(recurse);	
			}
		}
		this.visible = false;
	}
	
	this.setLabel = function( label )
	{
		this.labelElement.innerHTML = label;
	}
	
	this.hideChildrenOfChildren = function() 
	{
		for( var i = 0; i < this.childElements.length; i++ ) {
			var c = this.childElements[i];		
			for( var j = 0; j < c.childElements.length; j++ ) {
				c.childElements[j].hide();	
			}
		}
	}
	this.position = function(x,y) { 
		this.x = x; 
		this.y = y; 
		if( this.realRootElement ) {
			this.realRootElement.style.left = (x) + 'px'; 
			this.realRootElement.style.top = (y) + 'px';
		}
	}
	
	this.prependChild = function( id, icon, label )
	{
		var el = new listMenu( id, icon, label, this );
		this.childElements.unshift( el );
		this.subElements.insertBefore( el.rootElement, this.subElements.childNodes[ 0 ] );
		return el;
	}
	
	this.addChild = function( id, icon, label )
	{
		var el = new listMenu( id, icon, label, this );
		this.childElements.push( el );
		this.subElements.appendChild( el.rootElement );
		return el;
	}
	
	this.removeChild = function(id, recurse)
	{
		recurse = recurse || false;
		
		for( var i = 0; i < this.childElements.length; i++ )
		{
			if( recurse ) {
				this.childElements[ i ].removeChild( id, true );
			}
			if( this.childElements[ i ].id == id ) {
				this.subElements.removeChild( this.childElements[ i ].rootElement );
				this.childElements.splice(i,1);
				i--;
			}
		}
	}
	
	this.mouseover = function(e)
	{
		e.preventDefault();
		e.stopPropagation();
		for( var i = 0; i < this.childElements.length; i++ )
		{
			 this.childElements[ i ].show();
			
		}
		var self = this;
		setTimeout( function(){
			var px = self.x + self.rootElement.offsetWidth;
			var py = self.y + self.rootElement.offsetTop;
			if( px + self.subElements.offsetWidth > width ) {
				px = self.x - self.subElements.offsetWidth;
			}
			if( py + self.subElements.offsetHeight > height ) {
				py = self.y + self.rootElement.offsetTop - self.subElements.offsetHeight + self.rootElement.offsetHeight;
			}
			for( var i = 0; i < self.childElements.length; i++ )
			{
				 self.childElements[ i ].position( px, py ) ;
				 self.childElements[ i ].show();
				
			}
			
			self.subElements.style.left = px + 'px';
			self.subElements.style.top = py + 'px';
		}, 10 );
		//this.subElements.style.display = 'block';
		delayedMenuHide.trigger();
	}
	
	this.posOnScreen = function( x, y )
	{
		return ( x >= 300 && y >= 300 && x < width-300 && y < height-300  )	
	}
	
	this.mouseout = function()
	{
		//this.subElements.style.display = 'none';
	}
}
	