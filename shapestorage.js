
function ShapeStorage()
{
	this.loadShapeList = function( key, shapeList )
	{
		//console.log( location.hostname );
		shapeList.importJson( window.localStorage.getItem( key ) );
	}
	
	this.saveShapeList = function( key, shapeList )
	{
		//console.log( location.hostname );
		//console.log( 'save:' + key );
		var failed = false;
		var val1 = shapeList.exportJson();
		//console.error( 'saving: ' + val1.length );
		
		try {
			window.localStorage.setItem( key, val1 );
			var val2 = window.localStorage.getItem( key );
			if( val1 != val2 ) failed = true; // just double checking .. couldnt quickly find accurate docs
		}
		catch( ex )
		{
			failed = true;
		}
		if( failed ) {
			console.error( 'You can disable autosave at the bottom of the wallpaper settings if needed. ' );
			console.error( 'Failed to save ' + val1.length.toLocaleString() + ' bytes of data.');
		}
		else {
			//console.error( 'saved: ' + val1.length );
		}
		return !failed;
	}
}
