/* Generates a random shape w/ custom interval. */
function generatorRandom() {

	/* Initialize Variables */
	const toggleLogging = false;
	const logTitleText = "Randomizer";
	const logSeparatorText = " | ";
	var timeIntervalDifference;

	// Define generator types array
	const generatorTypes = [
		{
			Id: 0,
			Name: "Peace",
			Type: new generatorPeace()
		},
		{
			Id: 1,
			Name: "Pokeball",
			Type: new generatorPokeball()
		},
		{
			Id: 2,
			Name: "Yin Yang",
			Type: new generatorYinYang()
		},
		{
			Id: 3,
			Name: "Atom",
			Type: new generatorAtom()
		},
		{
			Id: 4,
			Name: "HLine",
			Type: new generatorHLine()
		},
		{
			Id: 5,
			Name: "HLine x2",
			Type: new generatorH2Line()
		},
		{
			Id: 6,
			Name: "HLine x3",
			Type: new generatorH3Line()
		},
		{
			Id: 7,
			Name: "VLine",
			Type: new generatorVLine()
		},
		{
			Id: 8,
			Name: "VLine x2",
			Type: new generatorV2Line()
		},
		{
			Id: 9,
			Name: "VLine x2",
			Type: new generatorV3Line()
		},
		{
			Id: 10,
			Name: "Plus",
			Type: new generatorPlus()
		},
		{
			Id: 11,
			Name: "Cross",
			Type: new generatorCross()
		},
		{
			Id: 12,
			Name: "Cross 2",
			Type: new generatorCross2()
		},
		{
			Id: 13,
			Name: "Diamond",
			Type: new generatorDiamond()
		},
		{
			Id: 14,
			Name: "Square",
			Type: new generatorSquare()
		},
		{
			Id: 15,
			Name: "Swirl 1 ccw",
			Type: new generatorSwirlReversed()
		},
		{
			Id: 16,
			Name: "Swirl 1 cw",
			Type: new generatorSwirl()
		},
		{
			Id: 17,
			Name: "Swirl 2 ccw",
			Type: new generatorSwirl2Reversed()
		},
		{
			Id: 18,
			Name: "Swirl 2 cw",
			Type: new generatorSwirl2()
		},
		{
			Id: 19,
			Name: "Swirl 3 ccw",
			Type: new generatorSwirl3Reversed()
		},
		{
			Id: 20,
			Name: "Swirl 3 cw",
			Type: new generatorSwirl3()
		},
		{
			Id: 21,
			Name: "Swirl 4 ccw",
			Type: new generatorSwirl4Reversed()
		},
		{
			Id: 22,
			Name: "Swirl 4 cw",
			Type: new generatorSwirl4()
		},
		{
			Id: 23,
			Name: "Circles 1",
			Type: new generatorLeaf6()
		},
		{
			Id: 24,
			Name: "Circles 2",
			Type: new generatorLeaf8()
		},
		{
			Id: 25,
			Name: "Circles 3",
			Type: new generatorLeaf26()
		},
		{
			Id: 26,
			Name: "Circles 4",
			Type: new generatorLeaf36()
		},
		{
			Id: 27,
			Name: "Circles 5",
			Type: new generatorLeaf28()
		},
		{
			Id: 28,
			Name: "Circles 6",
			Type: new generatorSwirl3BiDirectional()
		},
		{
			Id: 29,
			Name: "Circles 7",
			Type: new generatorSwirl4BiDirectional()
		},
		{
			Id: 30,
			Name: "Biohazard",
			Type: new generatorBiohazard()
		},
		{
			Id: 31,
			Name: "Pentagram",
			Type: new generatorPentagram()
		},
		{
			Id: 32,
			Name: "Circle Triangle",
			Type: new generatorCircleTriangle()
		},
		{
			Id: 33,
			Name: "Heart",
			Type: new generatorHeart()
		},
		{
			Id: 34,
			Name: "Heart x2",
			Type: new generatorHeart2()
		},
		{
			Id: 35,
			Name: "Heart x3",
			Type: new generatorHeart3()
		},
		{
			Id: 36,
			Name: "Circle",
			Type: new generatorCircle()
		},
		{
			Id: 37,
			Name: "Triangle",
			Type: new generatorTriangle()
		},
		{
			Id: 38,
			Name: "Star",
			Type: new generatorStar()
		}
	]

	if (toggleLogging) {
		console.log(logTitleText + logSeparatorText + "Total Generation Types = " + generatorTypes.length);
	}

	/* Initialize Functions */

	// Function: AbortTimerInterval - Aborts the timer interval
	function abortTimerInterval() {
		// Clears the timer interval
		clearInterval(timeIntervalDifference);
	}

	// Function: Randomize - Returns a pseudorandom number between a specified range
	function randomize(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// Function: GetRandomGeneration - Gets a random generation
	function getRandomGeneration() {
		/* Initialize Variables */
		var randomCase;

		var generatorObj = {
			Id: generatorTypes[0].Id,
			Name: generatorTypes[0].Name,
			Type: generatorTypes[0].Type
		}

		// Gets a random case
		randomCase = randomize(1, generatorTypes.length);

		var generatorArrayId = randomCase - 1;

		// Assigns the generator data
		generatorObj.Id = generatorTypes[generatorArrayId].Id;
		generatorObj.Name = generatorTypes[generatorArrayId].Name;
		generatorObj.Type = generatorTypes[generatorArrayId].Type;

		if (toggleLogging) {
			console.log(logTitleText + logSeparatorText + "Id = " + generatorObj.Id + ", Name = " + generatorObj.Name);
		}

		// Invoke random generation
		generatorObj.Type.generate(shapeList);
	}

	// Function: Generate - Generates the new shape
	this.generate = function (shapeList, randomSecondsInterval) {
		// Empty shape list
		shapeList.empty();

		// Total milliseconds interval
		var totalMillisecondsInterval = randomSecondsInterval * 1000;

		if (toggleLogging) {
			console.log(logTitleText + logSeparatorText + "Interval = " + randomSecondsInterval + " Second/s || " + totalMillisecondsInterval + " (ms.)");
		}

		// Set the time interval difference variable to invoke getRandomGeneration
		timeIntervalDifference = setInterval(getRandomGeneration, totalMillisecondsInterval);
	}
}

function generatorTest()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();

		function renderHeart(width, height)
		{
			var dt = [];

			// Constants
			const STEP_SIZE = 0.01;
			const PI_TWO = Math.PI * 2; // 6.28 - Twice the ratio of the circumference of a circle to its diameter.

			// Constants: X
			var xPow = 3; // Power

			// Constants: Y - Size
			var y1 = 13;
			var y2 = 5;
			var y3 = 2;
		
			// Constants: Y - Angles (Radians)
			var yAngle1 = 2;
			var yAngle2 = 3;
			var yAngle3 = 4;

			for (var STEP = 0; STEP < PI_TWO; STEP += STEP_SIZE)
			{
				var radius = 10; // Radius
				
				// X
				var x = radius * width * Math.pow(Math.sin(STEP), xPow);

				// Y
				var y = height * (y1 * Math.cos(STEP) - y2 * Math.cos(yAngle1 * STEP) - y3 * Math.cos(yAngle2 * STEP) - Math.cos(yAngle3 * STEP));
				
				dt.push([x, y]);
			}

			return dt;
		}

		var heart0 = renderHeart(10, -5);
		var heart1 = renderHeart(16, -10); // Default (X-Width): 16, Default (Y-Height): -1
		var heart2 = renderHeart(21, -15);

		var pl = new shapePointList();
		pl = new shapePointList(); pl.setData( heart0 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( heart1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( heart2 ); shapeList.add( pl );
	}

	this.rotate = function( x, y, rad )
	{
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2, y2];
	}
}

function generatorStar()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();

		var length = 200;
		
		// Triangle 1
		var dt1 = [[-length,length/2],[length,length/2]] // Bottom
		var dt2 = [[-length,length/2],[0,-length]] // Left
		var dt3 = [[length,length/2],[0,-length]] // Right

		// Triangle 2
		var dt4 = [[-length,-length/2],[length,-length/2]] // Top
		var dt5 = [[-length,-length/2],[0,length]] // Left
		var dt6 = [[length,-length/2],[0,length]] // Right

		var pl = new shapePointList();
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt3 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt4 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt5 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt6 ); shapeList.add( pl );
	}
}

function generatorCircle()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();

		var dia = 200;
		var length = 200;
		var diaMargin1 = 0;

		// Circle
		var dt = [];
		for( var i = 0; i <= dia; i++ )
		{
			var rad = Math.PI + ( i * Math.PI / (dia / 2) );
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x * length, y * length ]);
		}

		var pl = new shapePointList();
		pl = new shapePointList(); pl.setData( dt ); shapeList.add( pl );
	}
}

function generatorTriangle()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();

		var length = 200;
		
		// Triangle
		var dt1 = [[-length,length/2],[length,length/2]]
		var dt2 = [[-length,length/2],[0,-length]]
		var dt3 = [[length,length/2],[0,-length]]

		var pl = new shapePointList();
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt3 ); shapeList.add( pl );
	}
}

function generatorHeart()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dtX = [];

		// Constants
		const STEP_SIZE = 0.01; // 0.01
		const PI_TWO = Math.PI * 2; // 6.28 - Twice the ratio of the circumference of a circle to its diameter.

		// Constants: X
		var xPow = 3; // 3 - Width (x) power

		// Constants: Y - Size
		var y1 = 13; // 13
		var y2 = 5; // 5
		var y3 = 2; // 2
	
		// Constants: Y - Angles (Radians)
		var yAngle1 = 2; // 2
		var yAngle2 = 3; // 3
		var yAngle3 = 4; // 4

		// X (Width)
		var xWidth = 16; // Default: 16

		// Y (Height)
		var yHeight = -10; // Default: -1

		for (var STEP = 0; STEP < PI_TWO; STEP += STEP_SIZE)
		{
			var radius = 10; // Radius
			
			// X
			var x = radius * xWidth * Math.pow(Math.sin(STEP), xPow);

			// Y
			var y = yHeight * (y1 * Math.cos(STEP) - y2 * Math.cos(yAngle1 * STEP) - y3 * Math.cos(yAngle2 * STEP) - Math.cos(yAngle3 * STEP));
			
			dtX.push([x, y]);
		}

		var pl = new shapePointList();
		pl = new shapePointList(); pl.setData( dtX ); shapeList.add( pl );
	}
}

function generatorHeart2()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();

		function renderHeart(width, height)
		{
			var dt = [];

			// Constants
			const STEP_SIZE = 0.01;
			const PI_TWO = Math.PI * 2; // 6.28 - Twice the ratio of the circumference of a circle to its diameter.

			// Constants: X
			var xPow = 3; // Power

			// Constants: Y - Size
			var y1 = 13;
			var y2 = 5;
			var y3 = 2;
		
			// Constants: Y - Angles (Radians)
			var yAngle1 = 2;
			var yAngle2 = 3;
			var yAngle3 = 4;

			for (var STEP = 0; STEP < PI_TWO; STEP += STEP_SIZE)
			{
				var radius = 10; // Radius
				
				// X
				var x = radius * width * Math.pow(Math.sin(STEP), xPow);

				// Y
				var y = height * (y1 * Math.cos(STEP) - y2 * Math.cos(yAngle1 * STEP) - y3 * Math.cos(yAngle2 * STEP) - Math.cos(yAngle3 * STEP));
				
				dt.push([x, y]);
			}

			return dt;
		}

		var heart0 = renderHeart(10, -5);
		var heart1 = renderHeart(16, -10); // Default (X-Width): 16, Default (Y-Height): -1

		var pl = new shapePointList();
		pl = new shapePointList(); pl.setData( heart0 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( heart1 ); shapeList.add( pl );
	}
}

function generatorHeart3()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();

		function renderHeart(width, height)
		{
			var dt = [];

			// Constants
			const STEP_SIZE = 0.01;
			const PI_TWO = Math.PI * 2; // 6.28 - Twice the ratio of the circumference of a circle to its diameter.

			// Constants: X
			var xPow = 3; // Power

			// Constants: Y - Size
			var y1 = 13;
			var y2 = 5;
			var y3 = 2;
		
			// Constants: Y - Angles (Radians)
			var yAngle1 = 2;
			var yAngle2 = 3;
			var yAngle3 = 4;

			for (var STEP = 0; STEP < PI_TWO; STEP += STEP_SIZE)
			{
				var radius = 10; // Radius
				
				// X
				var x = radius * width * Math.pow(Math.sin(STEP), xPow);

				// Y
				var y = height * (y1 * Math.cos(STEP) - y2 * Math.cos(yAngle1 * STEP) - y3 * Math.cos(yAngle2 * STEP) - Math.cos(yAngle3 * STEP));
				
				dt.push([x, y]);
			}

			return dt;
		}

		var heart0 = renderHeart(10, -5);
		var heart1 = renderHeart(16, -10); // Default (X-Width): 16, Default (Y-Height): -1
		var heart2 = renderHeart(21, -15);

		var pl = new shapePointList();
		pl = new shapePointList(); pl.setData( heart0 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( heart1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( heart2 ); shapeList.add( pl );
	}
}

function generatorCircleTriangle()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();

		var length = 200;
		var dia = 800;
		var diaMargin = 30;

		// Circle 1
		var dt = [];
		for( var i = 0; i <= dia; i++ )
		{
			var rad = Math.PI + ( i * Math.PI / (dia / 2) );
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x * (length + diaMargin), y * length ]);
		}

		var dia1 = 80;
		var dt4 = [];
		var length1 = 80;
		var diaMargin1 = 0;

		// Circle 2
		for( var i = 0; i <= dia1; i++ )
		{
			var rad = Math.PI + ( i * Math.PI / (dia1 / 2) );
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt4.push([ x * length1, y * (length1 - diaMargin1) ]);
		}
		

		var dia3 = 25;
		var dtP = [];
		var length3 = 25;
		var diaMargin3 = 0;

		// Circle 3
		for( var i = 0; i <= dia3; i++ )
		{
			var rad = Math.PI + ( i * Math.PI / (dia3 / 2) );
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dtP.push([ x * length3, y * (length3 - diaMargin3) ]);
		}

		// Triangles
		var dt1 = [[-length,length/2],[length,length/2]]
		var dt2 = [[-length,length/2],[0,-length]]
		var dt3 = [[length,length/2],[0,-length]]

		var pl;
		pl = new shapePointList(); pl.setData( dt ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt3 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt4 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dtP ); shapeList.add( pl );
	}
}

function generatorBiohazard()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 720; i++ )
		{
			var rad = ( i * Math.PI * 1.75 / 720 ) - Math.PI * 157 /  180 ;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*100, y*100-120 ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
	
		for( var i = 1; i < 3; i++ )
		{
			var angle = i * Math.PI * 120 / 180 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
		dt = [];
		for( var i = 0; i <= 100; i++ )
		{
			var rad = ( ( i + 10 ) * Math.PI / 180 );
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*100, y*100 ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		dt = [];
		for( var i = 0; i <= 100; i++ )
		{
			var rad = ( ( i + 10 + 120 ) * Math.PI / 180 );
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*100, y*100 ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		dt = [];
		for( var i = 0; i <= 100; i++ )
		{
			var rad = ( ( i + 10 + 240 ) * Math.PI / 180 );
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*100, y*100 ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorPokeball()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 500.01 ) + Math.PI;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*200, y*200 ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		var dt2 = [];
		for( var j = 0; j < dt.length; j++ )
		{
			dt2.push( [ dt[j][0]*0.30, dt[j][1]*0.30 ] );
		}
		
		var pl = new shapePointList();
		pl.setData( dt2 );
		shapeList.add( pl );
		 dt2 = [];
		for( var j = 0; j < dt.length; j++ )
		{
			dt2.push( [ dt[j][0]*0.15, dt[j][1]*-0.15 ] );
		}
		
		var pl = new shapePointList();
		pl.setData( dt2 );
		shapeList.add( pl );
	
		var dt1 = [[190,0],[70,0]];
		var dt2 = [[-190,0],[-70,0]];
		
		var pl;
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorYinYang()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 720; i++ )
		{
			var rad = -( i * Math.PI / 360.01 );
			if( i > 360 )  rad = -Math.PI-rad;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			if( x > 0 ) y -= 1;
			if( x <= 0 ) y += 1;
			dt.push([ x*100, y*100 ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		dt = [];
		for( var i = 0; i <= 360; i++ )
		{
			var rad = ( i * Math.PI / 360.00 );
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*200, y*200 ]);
		}
		
		pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		dt = [];
		for( var i = 360; i <= 720; i++ )
		{
			var rad = ( i * Math.PI / 360.00 );
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*200, y*200 ]);
		}
		
		pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		dt = [];
		for( var i = 0; i <= 720; i++ )
		{
			var rad = ( i * Math.PI / 360.00 ) + Math.PI/2;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*35, y*35-100 ]);
		}
		
		pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );

		dt = [];
		for( var i = 0; i <= 720; i++ )
		{
			var rad = ( i * Math.PI / 360.00 ) - Math.PI/2;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*35, y*35+100 ]);
		}
		
		pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorAtom()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var pl, dt1, dt2;
		
		dt1 = [];
		for( var i = 0; i <= 360; i++ )
		{
			var rad = ( i * Math.PI / 360.00 );			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt1.push([ x*200, y*50 ]);
		}
		
		pl = new shapePointList();
		pl.setData( dt1 );
		shapeList.add( pl );
		
		dt2 = [];
		for( var i = 360; i <= 720; i++ )
		{
			var rad = ( i * Math.PI / 360.00 );			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt2.push([ x*200, y*50 ]);
		}
		
		pl = new shapePointList();
		pl.setData( dt2 );
		shapeList.add( pl );
		
		for( var i = 1; i < 4; i++ )
		{
			var angle = i * Math.PI * 1 / 4 ;
			var dt3 = [];
			for( var j = 0; j < dt1.length; j++ )
			{
				dt3.push( this.rotate( dt1[j][0], dt1[j][1], angle ) );
			}
		
			pl = new shapePointList();
			pl.setData( dt3 )
			shapeList.add( pl );
			
			dt3 = [];
			for( var j = 0; j < dt2.length; j++ )
			{
				dt3.push( this.rotate( dt2[j][0], dt2[j][1], angle ) );
			}
		
			pl = new shapePointList();
			pl.setData( dt3 )
			shapeList.add( pl );
		}
		
		dt1 = [];
		for( var i = 0; i <= 360; i++ )
		{
			var rad = ( i * Math.PI / 360.00 );			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt1.push([ x*35, y*35 ]);
		}
		
		pl = new shapePointList();
		pl.setData( dt1 );
		shapeList.add( pl );
		
		dt2 = [];
		for( var i = 360; i <= 720; i++ )
		{
			var rad = ( i * Math.PI / 360.00 );			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt2.push([ x*35, y*35 ]);
		}
		
		pl = new shapePointList();
		pl.setData( dt2 );
		shapeList.add( pl );
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorSwirl()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 500.01 ) - Math.PI/2;
			if( i > 500 )  rad = Math.PI*2-rad;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			if( y > 0 ) x -= 1;
			if( y <= 0 ) x += 1;
			dt.push([ x*100, y*100 ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 4; i++ )
		{
			var angle = i * Math.PI * 1 / 4 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
		
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorSwirl2()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 500.01 ) - Math.PI/2;
			if( i > 500 )  rad = Math.PI*2-rad;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			if( y > 0 ) x -= 1;
			if( y <= 0 ) x += 1;
			dt.push([ x*50, y*100 ]);
		}
		var l = dt.length;
		for( var i = 0; i < l; i++ )
		{
			var pt = [dt[i][0],dt[i][1]];
			dt[i][0]-= 100;
			pt[0] += 100;
			dt.push( pt );
			
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 4; i++ )
		{
			var angle = i * Math.PI * 1 / 4 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
	
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorSwirlReversed()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 500.01 ) - Math.PI/2;
			if( i > 500 )  rad = Math.PI*2-rad;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			if( y > 0 ) x -= 1;
			if( y <= 0 ) x += 1;
			dt.push([ x*100, y*-100 ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 4; i++ )
		{
			var angle = i * Math.PI * 1 / 4 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
		
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorSwirl2Reversed()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 500.01 ) - Math.PI/2;
			if( i > 500 )  rad = Math.PI*2-rad;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			if( y > 0 ) x -= 1;
			if( y <= 0 ) x += 1;
			dt.push([ x*50, y*-100 ]);
		}
		var l = dt.length;
		for( var i = 0; i < l; i++ )
		{
			var pt = [dt[i][0],dt[i][1]];
			dt[i][0]-= 100;
			pt[0] += 100;
			dt.push( pt );
			
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 4; i++ )
		{
			var angle = i * Math.PI * 1 / 4 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
	
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorSwirl3Reversed()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 500.01 ) - Math.PI/2;
			var f = i / 5;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*f, y*f ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 6; i++ )
		{
			var angle = i * Math.PI * 2 / 6 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
		
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorSwirl3()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 500.01 ) - Math.PI/2;
			var f = i / 5;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*f, y*-f ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 6; i++ )
		{
			var angle = i * Math.PI * 2 / 6;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
		
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorSwirl4Reversed()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 166.7 ) - Math.PI/2;
			var f = i / 5;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*f, y*f ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 6; i++ )
		{
			var angle = i * Math.PI * 2 / 6 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
		
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorSwirl3BiDirectional()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			//var p = easeInOutQuad( i / 1000.01 ) * 2;
			var rad = ( i * Math.PI / 500.01 ) ;// - Math.PI*2/3 + Math.PI/7;
			var f = easeInOutQuad( i / 1000 ) * 200;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*f, y*-f ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 8; i++ )
		{
			var angle = Math.floor(i/2) * Math.PI * 4 / 8 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( (i%2==1?-1:1)*dt[j][0], dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
		
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorSwirl4BiDirectional()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			//var p = easeInOutQuad( i / 1000.01 ) * 2;
			var rad = ( i * Math.PI / 500.01 ) ;// - Math.PI*2/3 + Math.PI/7;
			var f = easeInOutQuad( i / 1000 ) * 200;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*f, y*-f ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 14; i++ )
		{
			var angle = Math.floor(i/2) * Math.PI * 4 / 14 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( (i%2==1?-1:1)*dt[j][0], dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
		
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorSwirl4()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 166.7 ) - Math.PI/2;
			var f = i / 5;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*f, y*-f ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 6; i++ )
		{
			var angle = i * Math.PI * 2 / 6 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
		
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorLeaf6()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 500.01 ) - Math.PI/2;
			if( i > 500 )  rad = Math.PI*2-rad;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			if( y > 0 ) x -= 1;
			if( y <= 0 ) x += 1;
			dt.push([ x*100, y*100 ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 6; i++ )
		{
			var angle = Math.floor(i/2) * Math.PI * 2 / 6 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], (i%2==1?-1:1)*dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
		
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}
	
function generatorLeaf8()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 500.01 ) - Math.PI/2;
			if( i > 500 )  rad = Math.PI*2-rad;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			if( y > 0 ) x -= 1;
			if( y <= 0 ) x += 1;
			dt.push([ x*100, y*100 ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 8; i++ )
		{
			var angle = Math.floor(i/2) * Math.PI * 2 / 8 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], (i%2==1?-1:1)*dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
		
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorLeaf26()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 500.01 ) - Math.PI/2;
			if( i > 500 )  rad = Math.PI*2-rad;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			if( y > 0 ) x -= 1;
			if( y <= 0 ) x += 1;
			dt.push([ x*50, y*50 ]);
		}
		var l = dt.length;
		for( var i = 0; i < l; i++ )
		{
			var pt = [dt[i][0],dt[i][1]];
			dt[i][0]-= 100;
			pt[0] += 100;
			dt.push( pt );
			
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 6; i++ )
		{
			var angle = Math.floor(i/2) * Math.PI * 2 / 6 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], (i%2==1?-1:1)*dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
	
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorLeaf36()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 500.01 ) - Math.PI/2;
			if( i > 500 )  rad = Math.PI*2-rad;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			if( y > 0 ) x -= 1;
			if( y <= 0 ) x += 1;
			dt.push([ x*50, y*100 ]);
		}
		var l = dt.length;
		for( var i = 0; i < l; i++ )
		{
			var pt = [dt[i][0],dt[i][1]];
			dt[i][0]-= 100;
			pt[0] += 100;
			dt.push( pt );
			
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 6; i++ )
		{
			var angle = Math.floor(i/2) * Math.PI * 2 / 6 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], (i%2==1?-1:1)*dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
	
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorLeaf28()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 1000; i++ )
		{
			var rad = ( i * Math.PI / 500.01 ) - Math.PI/2;
			if( i > 500 )  rad = Math.PI*2-rad;
			
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			if( y > 0 ) x -= 1;
			if( y <= 0 ) x += 1;
			dt.push([ x*50, y*50 ]);
		}
		var l = dt.length;
		for( var i = 0; i < l; i++ )
		{
			var pt = [dt[i][0],dt[i][1]];
			dt[i][0]-= 100;
			pt[0] += 100;
			dt.push( pt );
			
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		for( var i = 1; i < 8; i++ )
		{
			var angle = Math.floor(i/2) * Math.PI * 2 / 8 ;
			var dt2 = [];
			for( var j = 0; j < dt.length; j++ )
			{
				dt2.push( this.rotate( dt[j][0], (i%2==1?-1:1)*dt[j][1], angle ) );
			}
		
			var pl = new shapePointList();
			pl.setData( dt2 )
			shapeList.add( pl );
		}
		
	
	}
	
	this.rotate = function( x, y, rad )
	{
		
		var x2 = x * Math.cos(rad) - y * Math.sin( rad );
		var y2 = y * Math.cos(rad) + x * Math.sin( rad );
		return [x2,y2];
	}
}

function generatorPeace()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 800; i++ )
		{
			var rad = Math.PI + ( i * Math.PI / 400.00 );
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*200, y*200 ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		var dt1 = [[0,-200],[0,0]];
		var dt2 = [[0,200],[0,0]];
		var dt3 = [[-141,141],[0,0]];
		var dt4 = [[141,141],[0,0]];
		
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt3 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt4 ); shapeList.add( pl );
		
		
	}
}

function generatorPentagram()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt = [];
		for( var i = 0; i <= 800; i++ )
		{
			var rad = Math.PI + ( i * Math.PI / 400.00 );
			var x = Math.sin(rad);
			var y = Math.cos(rad);
			dt.push([ x*200, y*200 ]);
		}
		
		var pl = new shapePointList();
		pl.setData( dt );
		shapeList.add( pl );
		
		var pt1 = [ Math.sin( 0*Math.PI/180 ) * 200, Math.cos( 0*Math.PI/180 ) * 200 ];
		var pt2 = [ Math.sin( 72*Math.PI/180 ) * 200, Math.cos( 72*Math.PI/180 ) * 200 ];
		var pt3 = [ Math.sin( 144*Math.PI/180 ) * 200, Math.cos( 144*Math.PI/180 ) * 200 ];
		var pt4 = [ Math.sin( 216*Math.PI/180 ) * 200, Math.cos( 216*Math.PI/180 ) * 200 ];
		var pt5 = [ Math.sin( 288*Math.PI/180 ) * 200, Math.cos( 288*Math.PI/180 ) * 200 ];
		// 0/360
		// 72
		// 144
		// 72
		// 216
		// 288
		
		var dt1 = [pt1,pt3];
		var dt2 = [pt3,pt5];
		var dt3 = [pt5,pt2];
		var dt4 = [pt2,pt4];
		var dt5 = [pt4,pt1];
		
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt3 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt4 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt5 ); shapeList.add( pl );
		
		
	}
}

function generatorDiamond()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt1 = [[0,-200],[100,0]];
		var dt2 = [[100,0],[0,200]];
		var dt3 = [[0,200],[-100,0]];
		var dt4 = [[-100,0],[0,-200]];
		
		var pl;
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt3 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt4 ); shapeList.add( pl );
		
	}
}

function generatorSquare()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt1 = [[0,-200],[200,-200],[200,0]];
		var dt2 = [[200,0],[200,200],[0,200]];
		var dt3 = [[0,200],[-200,200],[-200,0]];
		var dt4 = [[-200,0],[-200,-200],[0,-200]];
		
		var pl;
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt3 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt4 ); shapeList.add( pl );
		
	}
}

function generatorCross()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt1 = [[-200,-200],[200,200]];
		var dt2 = [[-200,200],[200,-200]];
		
		var pl;
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		
	}
}

function generatorCross2()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt1 = [[-180,-200],[0,-20],[180,-200]];
		var dt2 = [[-180, 200],[0, 20],[180,200]];
		
		var dt3 = [[ 200,-180],[ 20, 0],[ 200, 180]];
		var dt4 = [[-200,-180],[-20, 0],[-200, 180]];
		
		var pl;
		pl = new shapePointList([],true); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList([],true); pl.setData( dt2 ); shapeList.add( pl );
		pl = new shapePointList([],true); pl.setData( dt3 ); shapeList.add( pl );
		pl = new shapePointList([],true); pl.setData( dt4 ); shapeList.add( pl );
		
	}
}

function generatorPlus()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt1 = [[0,-200],[0,200]];
		var dt2 = [[-200,0],[200,0]];
		
		var pl;
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		
	}
}

function generatorHLine()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt2 = [[-200,0],[200,0]];
		
		var pl;
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		
	}
}

function generatorVLine()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt1 = [[0,-200],[0,200]];
		
		var pl;
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		
	}
}

function generatorH2Line()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt1 = [[-200,-100],[200,-100]];
		var dt2 = [[-200,100],[200,100]];
		
		var pl;
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		
	}
}

function generatorV3Line()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt1 = [[-200,-200],[-200,200]];
		var dt2 = [[0,-200],[0,200]];
		var dt3 = [[200,-200],[200,200]];
		
		var pl;
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt3 ); shapeList.add( pl );
		
	}
}

function generatorH3Line()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt1 = [[-200,-200],[200,-200]];
		var dt2 = [[-200,0],[200,0]];
		var dt3 = [[-200,200],[200,200]];
		
		var pl;
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt3 ); shapeList.add( pl );
		
	}
}

function generatorV2Line()
{
	this.generate = function( shapeList )
	{
		shapeList.empty();
		
		var dt1 = [[-100,-200],[-100,200]];
		var dt2 = [[100,-200],[100,200]];
		
		var pl;
		pl = new shapePointList(); pl.setData( dt1 ); shapeList.add( pl );
		pl = new shapePointList(); pl.setData( dt2 ); shapeList.add( pl );
		
	}
}

function shapeCircle()
 {
	
	this.centerDeg = 0;
	this.radius = 200;
	this.height = 100;
	
	
	this.prepare = function(totalPoints)
	{
		
	}
	
	this.getPositionFor = function( perc, val )
	{
		if( val > 1 ) val = 1;
		if( val < 0 ) val = 0;
		var deg = ( this.centerDeg - 180 ) + 360 * perc;
		var max = Math.min( this.height, this.radius );
		
		var s = Math.sin( deg / 180 * Math.PI );
		var c = Math.cos( deg / 180 * Math.PI );
		
		var min = [ s * this.radius - s * val * max ,  c * this.radius - c * val * max ];
		var max = [ s * this.radius + s * val * max ,  c * this.radius + c * val * max ];
		
		return [ min, max ];
	}
}

function shapeHeart()
{
	
	this.centerDeg = 0;
	this.radius = 200;
	this.height = 100;
	
	
	this.prepare = function(totalPoints)
	{
		
	}
	
	this.getPositionFor = function( perc, val )
	{
		/*perc = perc * 2;
		perc += 0.5;
		var perc2 = easeInOutQuad( perc % 1 ) + Math.floor(perc);
		perc2 -= 0.5;
		perc2 /= 2;
		perc = perc2;
		/*
		if( perc < 0.25 ) {
			perc = ( easeInOutQuart(perc/0.5+0.5) /* output range = 0.5 - 1 * / - 0.5 )  / 0.5;
		}
		else if( perc > 0.75 ) {
			perc = easeInOutQuart((perc-0.75)/0.5) /* output range = 0 - 0.5  * / * 0.5 + 0.75;
		}
		else {
			perc = easeInOutQuart((perc-0.25)/0.5) /* output range = 0 - 1  * /  * 0.5 + 0.25;
		}*/
		if( val > 1 ) val = 1;
		if( val < 0 ) val = 0;
		var deg = ( this.centerDeg - 180 ) + 360 * perc;
		var rad = deg * Math.PI / 180;
		var max = Math.min( this.height, this.radius );
		
		var s = Math.sin( rad );
		var c = Math.cos( rad );
		var c2 = Math.cos( 2*rad );
		var c3 = Math.cos( 3*rad );
		var c4 = Math.cos( 4*rad );
		
		var f1 = this.radius - max;
		var f2 = this.radius + max;
		
		var x = 3.9 * Math.pow(s,3);
		var y = 3 * c - 1.2 * c2 - 0.6 * c3 - 0.2 * c4;
		x /= 3.9;
		y /= 3.9;
		var min = [ x * this.radius - ( val * max * x  ) , -y * this.radius - ( val * max * -y ) ];
		var max = [ x * this.radius + ( val * max * x  ) , -y * this.radius + ( val * max * -y  ) ];
		
		return [ min, max ];
	}
}

function shapeLeaf()
{
	
	this.centerDeg = 90;
	this.radius = 200;
	this.height = 100;
	
	
	this.prepare = function(totalPoints)
	{
		
	}
	
	this.getPositionFor = function( perc, val )
	{
		if( val > 1 ) val = 1;
		if( val < 0 ) val = 0;
		var deg = ( this.centerDeg - 180 ) + 360 * perc;
		var rad = deg * Math.PI / 180;
		var max = Math.min( this.height, this.radius );
		
		var r =(1+0.9*Math.cos(8*rad))*(1+0.1*Math.cos(24*rad))/**(0.9+0.1*Math.cos(200*rad));*/*(1+Math.sin(rad));
		
		////var f1 = this.radius - max;
		var f2 = this.radius + max;
		
		var x =  (r*this.radius*0.3) * Math.sin( rad + Math.PI/2 );
		var y =  (r*this.radius*0.3) * Math.cos( rad + Math.PI/2 );
		var x1 = (r*this.radius*0.3-r*max*0.3) * Math.sin( rad + Math.PI/2 );
		var y1 = (r*this.radius*0.3-r*max*0.3) * Math.cos( rad + Math.PI/2 );
		var x2 = (r*this.radius*0.3+r*max*0.3) * Math.sin( rad + Math.PI/2 );
		var y2 = (r*this.radius*0.3+r*max*0.3) * Math.cos( rad + Math.PI/2 );
		
		var x1 = x + ( x1 - x ) * val;
		var x2 = x + ( x2 - x ) * val;
		var y1 = y + ( y1 - y ) * val;
		var y2 = y + ( y2 - y ) * val;
		
		
		var min = [ x1, y1 + this.radius * 0.5 ];
		var max = [ x2, y2 + this.radius * 0.5 ];
		
		return [ min, max ];
	}
}
	
function shapeButterfly()
{
	
	this.centerDeg = 270;
	this.radius = 150;
	this.height = 100;
	
	
	this.prepare = function(totalPoints)
	{
		
	}
	
	this.getPositionFor = function( perc, val )
	{
		if( val > 1 ) val = 1;
		if( val < 0 ) val = 0;
		var deg = ( this.centerDeg - 180 ) + 360 * perc;
		var rad = deg * Math.PI / 180;
		var max = Math.min( this.height, this.radius );
		
		var r =  9 - 0.5*Math.sin(rad) + 2.5*Math.sin(3*rad) + 2*Math.sin(5*rad) - 1.7*Math.sin(7*rad) + 3*Math.cos(2*rad) - 2*Math.cos(4*rad) - 0.4*Math.cos(16*rad);
		r /= 10;
		//var r =(1+0.9*Math.cos(8*rad))*(1+0.1*Math.cos(24*rad))/**(0.9+0.1*Math.cos(200*rad));*/*(1+Math.sin(rad));
		
		////var f1 = this.radius - max;
		var f2 = this.radius + max;
		
		var x =  (r*this.radius) * Math.sin( rad + Math.PI/2 );
		var y =  (r*this.radius) * Math.cos( rad + Math.PI/2 );
		var x1 = (r*this.radius-r*max) * Math.sin( rad + Math.PI/2 );
		var y1 = (r*this.radius-r*max) * Math.cos( rad + Math.PI/2 );
		var x2 = (r*this.radius+r*max) * Math.sin( rad + Math.PI/2 );
		var y2 = (r*this.radius+r*max) * Math.cos( rad + Math.PI/2 );
		
		var x1 = x + ( x1 - x ) * val;
		var x2 = x + ( x2 - x ) * val;
		var y1 = y + ( y1 - y ) * val;
		var y2 = y + ( y2 - y ) * val;
		
		
		var min = [ x1, y1  ];
		var max = [ x2, y2 ];
		
		return [ min, max ];
	}
}