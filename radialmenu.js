
function radialMenu( id, icon, label, parent )
{
	this.id = id;
	this.x = 0;
	this.y = 0;
	this.px = 0;
	this.py = 0;
	this.prad = null;
	
	this.pdeg = 0;
	this.pminDeg = 0;
	this.pmaxDeg = 360;
	
	this.onClick = null;
	this.visible = false;
	
	this.parentElement = parent || null;
	this.childElements = [];
	
	this.rootElement = document.createElement( 'DIV' );
	this.rootElement.className = 'radial-menu ' + ( this.parentElement ? 'radial-menu-item' : 'radial-menu-root' );
	if( icon ) {
		this.rootElement.style.backgroundImage = 'url( ' + icon + ' )';
		this.rootElement.style.backgroundPosition = 'center center';
		this.rootElement.style.backgroundRepeat = 'no-repeat';
	}
	else if( label ) {
		this.rootElement.innerHTML = label;
	}
	
	//if( this.parentElement ) {
	//	this.parentElement.rootElement.appendChild( this.rootElement );
	//}
	//else {
		document.body.appendChild( this.rootElement );
	//}
	
	var self = this;
	this.rootElement.onmouseover = function(e) { self.mouseover(e); }
	this.rootElement.onmouseout = function(e) { self.mouseout(e); }
	this.rootElement.onclick = function(e) { if( self.onClick) self.onClick(e,self); }
	
	this.show = function() { this.rootElement.style.display = 'block'; this.visible = true; }
	this.hide = function(recurse) { 
		recurse = recurse || false;
		this.rootElement.style.display = 'none'; 
		this.rootElement.style.backgroundColor = '#404040';
		if( recurse ) {
			for( var i = 0; i < this.childElements.length; i++ ) {
				this.childElements[i].hide(recurse);	
			}
		}
		this.visible = false;
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
		this.rootElement.style.left = (x-25) + 'px'; 
		this.rootElement.style.top = (y-25) + 'px';
	}
	
	this.parentPosition = function(px,py,rad, deg, minDeg, maxDeg) { 
		this.px = px; 
		this.py = py; 
		this.prad = rad; 
		this.pdeg = (deg+1080) % 360; 
		this.pmaxDeg = (maxDeg+1080) % 360; 
		this.pminDeg = (minDeg+1080) % 360; 
		if( this.pminDeg >= this.pmaxDeg) { 
			this.pmaxDeg += 360;
		}
	}
	
	this.update = function()
	{
		if( this.visible && this.parentElement && this.parentElement.visible ) {
			this.doUpdate();
		}
		for( var i = 0; i < this.childElements.length; i++ ) {
			this.childElements[i].update();	
		}
	}
	
	this.doUpdate = function()
	{
		return;
		var dx = 0;
		var dy = 0;
		// calculate rotation force
		if( ( this.pdeg < this.pminDeg && this.pdeg > this.pmaxDeg-360 ) 
		   || this.pdeg > this.pmaxDeg )
		{
			var md1 = this.pminDeg % 360;
			var md2 = this.pmaxDeg % 360;
			while( md1 > this.pdeg ) md1 -= 360;
			while( md1 < this.pdeg ) md1 += 360;
			while( md2 < this.pdeg ) md2 += 360;
			while( md2 > this.pdeg ) md2 -= 360;
			
			var d1 = Math.abs( md1 - this.pdeg );
			var d2 = Math.abs( md2 - this.pdeg );
			
			//console.error( d1 + ' ' + d2 + ' ' + this.pdeg + ' ' + this.pminDeg + ' ' + this.pmaxDeg );
			if(  d1 < d2 ) {
				// increase deg
				dx += Math.cos( (this.pdeg - 90)*Math.PI/180 )*5;
				dy += Math.cos( (this.pdeg - 90)*Math.PI/180 )*5;
			}
			else {
				// decrease deg
				dx += Math.sin( (this.pdeg + 90)*Math.PI/180 )*5;
				dy += Math.cos( (this.pdeg + 90)*Math.PI/180 )*5;
			}
			
			this.x += dx;
			this.y += dy;
			this.position( this.x, this.y );
				
		    var rad = Math.atan2(this.x - this.px, this.y - this.py);
		    this.prad = rad + Math.PI;
		    this.pdeg = rad * 180 / Math.PI;
		}
	    
	
	    
		// calculate rotation force
		var l = Math.sqrt( Math.pow( this.x-this.px,2 ) + Math.pow( this.y-this.py,2 ) );
		var loffset = 75-l;
		dx = Math.sin( (this.pdeg )*Math.PI/180 )*loffset/10;
		dy = Math.cos( (this.pdeg )*Math.PI/180 )*loffset/10;
		this.x += dx;
		this.y += dy;
		this.position( this.x, this.y );
		
		return;
		
		// check for distance to parents parent
		if( this.parentElement )
		{
			if( this.parentElement.parentElement ) {
				var x = this.parentElement.parentElement.x;
				var y = this.parentElement.parentElement.y;
				var dx = this.x-x;
				var dy = this.y-y;
				var l = Math.sqrt( Math.pow( dx,2 ) + Math.pow( dy,2 ) );
				if( l < 52 ) {
					dx/=l;
					dy/=l;
					this.position( this.x + dx, this.y + dy );
				}
			}
			
			// move everything else out of the way if needed :D
			for( var i = 0; i < this.parentElement.childElements.length; i++ ) {
				var x = this.parentElement.childElements[i].x;
				var y = this.parentElement.childElements[i].y;
				var dx = this.x-x;
				var dy = this.y-y;
				var l = Math.sqrt( Math.pow( dx,2 ) + Math.pow( dy,2 ) );
				if( l < 52 ) {
					if( l > 0 ) {
						dx/=l;
						dy/=l;
					}
					this.parentElement.childElements[i].position( x - dx, y - dy );
					
				}
			}
		}
	    
	}
	
	this.addChild = function( id, icon, label )
	{
		var el = new radialMenu( id, icon, label, this );
		this.childElements.push( el );
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
				this.childElements.splice(i,1);
				i--;
			}
		}
	}
	
	this.mouseover = function(e)
	{
		if( !this.visible ) return;
		if(e) e.stopPropagation();
		
		this.rootElement.style.backgroundColor = '#406080';
		
		this.hideChildrenOfChildren();
		
		// hide children of parent ( leave parent in position )		
		if( this.parentElement ) {			
			for( var i = 0; i < this.parentElement.childElements.length; i++ ) {
				if( this.parentElement.childElements[i] != this ) {
					this.parentElement.childElements[i].hide();	
				}
				//this.childElements[i].position();	
			}
			if( this.parentElement.parentElement ) {
				this.parentElement.parentElement.hide();
			}
			this.parentElement.show();
			this.parentElement.rootElement.style.backgroundColor = '#203040';
		}
		
		var scanFrom = -1;
		if( !this.posOnScreen( this.x + 100, this.y ) ) {
			scanFrom = 90;
		}
		else if( !this.posOnScreen( this.x - 100, this.y ) ) {
			scanFrom = 270;
		}
		else if( !this.posOnScreen( this.x , this.y - 100 ) ) {
			scanFrom = 180;
		}
		else if( !this.posOnScreen( this.x, this.y + 100 ) ) {
			scanFrom = 0;
		}
		
		var minDeg = 0;
		var maxDeg = 360;
		if( scanFrom >= 0 ) {
			var firstFound = -1;
			var lastFound = -1;
			for( var i = scanFrom; i < scanFrom + 360; i++ )
			{
				var visi = this.posOnScreen( this.x + Math.sin( i * Math.PI / 180 ) * 100, this.y + Math.cos( i * Math.PI / 180 ) * 100 );
				if( firstFound == -1 && visi ) {
					firstFound = i;
				}
				if( firstFound != -1 ) {
					if( visi ) 
						lastFound = i;
					else 
						break;
				}
			}
			minDeg = firstFound;
			maxDeg = lastFound;
		}
		//var degTotal = maxDev - minDeg;
		//var visibleLen = 2 * Math.PI * 75 * degTotal / 360;
		
		
		// show own children
		var elemsToShow = this.childElements.length+( this.prad === null ? 0 : 1 );
		
		//var lenNeeded = elemsToShow * 50;
		//var radius = lenNeeded * 360 / degTotal / 2 / Math.PI;
		
		var rad, 
			radBase = this.prad !== null ? this.prad : Math.PI, 
			radOffsetFirst = this.prad !== null ? 1 * Math.PI * 2 / elemsToShow  : 0;
			
		for( var i = 0; i < this.childElements.length; i++ ) {
			this.childElements[i].show();	
			rad = radBase - radOffsetFirst - i * Math.PI * 2 / elemsToShow ;
			this.childElements[i].parentPosition( this.x , this.y, rad + Math.PI,  rad * 180 / Math.PI, minDeg, maxDeg );	
			this.childElements[i].position( this.x + Math.sin(rad)*75, this.y + Math.cos(rad)*75 );	
		}
		
		delayedMenuHide.trigger();
	}
	
	this.posOnScreen = function( x, y )
	{
		return ( x >= 300 && y >= 300 && x < width-300 && y < height-300  )	
	}
	
	this.mouseout = function()
	{
		this.rootElement.style.backgroundColor = '#404040';
		if( !this.visible ) return;
		
	}
}
	