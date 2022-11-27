
function SvgPanel()
{
	
	var self = this;
	this.shape = null;
	this.panel = document.getElementById('svg-panel');
	this.panel.addEventListener('mousedown', function(e) { e.preventDefault(); e.stopPropagation(); return false;}, false );
	this.panel.addEventListener('mouseup', function(e) { e.preventDefault(); e.stopPropagation(); return false;}, false );
	
	this.progressWrapper = document.getElementById('svg-progress-wrapper');
	this.progressWrapper.style.display = 'none';
	this.progress = document.getElementById('svg-progress');
	
	this.btnClose = document.getElementById('svg-close');
	this.btnClose.addEventListener('mousedown', function(e) { e.preventDefault(); e.stopPropagation(); self.hide();  return false;}, false );
	this.btnClose.addEventListener('mouseup', function(e) { e.preventDefault(); e.stopPropagation();  return false; }, false );
	
	this.removeDetailAmount = 0.25;
	this.inpDetailRemoveWrapper = document.getElementById('svg-remove-detail-amount-wrapper');
	this.inpDetailRemove = document.getElementById('svg-remove-detail-amount');
	this.inpDetailRemove.addEventListener('mousedown', function(e) { e.stopPropagation();  return false; } );
	this.inpDetailRemove.addEventListener('mouseup', function(e) { e.stopPropagation();  return false;} );
	this.inpDetailRemove.addEventListener('change', function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		self.removeDetailAmount = this.value;
		return true;
	 }, false );
	
	this.inpFile = document.getElementById('svg-file');
	this.inpFile.addEventListener('mousedown', function(e) { e.preventDefault(); e.stopPropagation(); return false;}, false );
	this.inpFile.addEventListener('mouseup', function(e) { e.preventDefault(); e.stopPropagation(); return false;}, false );
	this.inpFile.addEventListener('change', function(e) {
		e.preventDefault(); e.stopPropagation();
		self.progressWrapper.style.display = 'block';
		self.inpDetailRemoveWrapper.style.display = 'none'; 
		self.btnClose.style.display = 'none';
		self.progress.style.width = 0;
		try {
			var file = self.inpFile.files[0];
			if( file ) {
			  	var reader = new FileReader();

			  	reader.onload = function(e) {
					try {
						svgSource = new SvgSource( reader.result, 
													self.removeDetailAmount,
													function(perc) {			
														self.progress.style.width = Math.round( 100 * perc ) + "%";
													} , 
													function() {										
														self.hide();
														shapeList.updateAutosave();
														self.progressWrapper.style.display = 'none';
														self.btnClose.style.display = 'block';
														self.inpDetailRemoveWrapper.style.display = 'block'; 
													} );
					}
					catch( ex ){
						console.log( ex.message );
						self.progressWrapper.style.display = 'none';
						self.btnClose.style.display = 'block';
						self.inpDetailRemoveWrapper.style.display = 'block'; 
					}
			  	}

			  	reader.readAsText(file); 
			}
		}
		catch( ex ){
			self.progressWrapper.style.display = 'none';
			self.btnClose.style.display = 'block';
			self.inpDetailRemoveWrapper.style.display = 'block'; 
			console.log( ex.message );
		}
		
	 }, false );
	 
	 
	
	
	
	this.show = function() { 
		this.panel.style.display = 'block'; 
		self.btnClose.style.display = 'block';
		self.inpDetailRemoveWrapper.style.display = 'block'; 
		self.progressWrapper.style.display = 'none'; 
		self.progress.style.width = 0;
		lockedDrawing = true; 
		this.inpFile.value = ""; 
	}
	this.hide = function() { 
		this.panel.style.display = 'none'; 
		lockedDrawing = false; 
	}
}