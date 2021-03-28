const navbarShowToggle = document.querySelector(".navbar-top-toggle");
			const navbarHideToggle = document.querySelector(".hide-navbar-top");
			setTimeout(()=>{document.querySelector("#firstLoad").click()},1000)
			cubeRotate()
			function cubeRotate(LoadTheTarget){
				var cubeGoTo = document.querySelectorAll("[cube-translate]")
				if (LoadTheTarget) {
					cubeGoTo = document.querySelectorAll(LoadTheTarget)
				}
				const cubeContainer = document.querySelector(".cube-container")
				const cube = document.querySelectorAll(".cube-container .cube")
				const cubeSide = document.querySelectorAll(".cube-container .cube .side")
				const cubeActive = document.querySelector(".side.front")
				const cubeTransition = 500;
				var rollTheBox = true
				cubeGoTo.forEach(gt => {
					gt.addEventListener("click",function(){
						event.preventDefault();
							var nextURL = this.getAttribute("href");					

							var sideTo = this.getAttribute("cube-translate");
							
							var sideTitle = this.getAttribute("side-title");
							var cubeContent = document.querySelectorAll(`.cube-content${this.getAttribute("cube-content")}`)[0];
							var gotoside = document.querySelector(sideTo);

							var targetPos = decodeURI(getComputedStyle(gotoside).transformOrigin).split(" ");
							var targetX = (targetPos[0]) ? parseInt(targetPos[0]) : 0;
							var targetY = (targetPos[1]) ? parseInt(targetPos[1]) : 0;

							var currentPos = decodeURI(getComputedStyle(cubeActive).transformOrigin).split(" ");
							var currentX = (currentPos[0]) ? parseInt(currentPos[0]) : 0;
							var currentY = (currentPos[1]) ? parseInt(currentPos[1]) : 0;


							const boxSlideStartEvent = new Event('boxSlideStart');
							this.addEventListener('boxSlideStart', function (e) {}, false);
							this.dispatchEvent(boxSlideStartEvent);


							

							var goToPos =  "rotateY(0deg)"

							if (targetX==0 && currentY==targetY) {
								goToPos =  "rotateY(90deg)"
							}else if (Math.ceil((targetX/currentX))>=2 && targetY==0) {
								goToPos =  "rotateY(-90deg)"
							}else if (targetY==0 && currentX==targetX) {
								goToPos = "rotateX(-90deg)"
							}else if (Math.ceil((targetY/currentY))>=2 && targetX==currentX) {
								goToPos =  "rotateX(90deg)"
							}else if (sideTo==".side.back") {
								goToPos =  "rotateX(-180deg)"

							}


							var unChoosenTo = 0;

							if (cubeContainer.classList.contains("choosen")) {
								setTimeout(()=>{
									cubeContainer.classList.remove("choosen");
								},600)
								unChoosenTo = 1200;
								cubeContainer.classList.add("unchoosen");


								document.querySelectorAll(".cube-content").forEach(dc=>{
									if(dc.classList.contains("content-active")){
										setTimeout(()=>{
											dc.classList.remove("content-active");
										},300)
									}
								})						
							}

							document.querySelector(".mask-content").style.zIndex = '-1'
							

							setTimeout(()=>{		
								if (cubeContainer.classList.contains("unchoosen")) {
									cubeContainer.classList.remove("unchoosen");
								}

								cubeSide.forEach(cbx => {
									cbx.classList.remove("side-active");
								})
								cube.forEach(cb => {
									cb.style.transition = `transform ${cubeTransition}ms ease-in-out 0s`;
									cb.style.transform = "rotateY(0deg)";



									if (nextURL!=null) {

										cubeContent.innerHTML = "<div style='width:100vw;height:100vh;display:flex;justify-content:center;align-items: center;color:rgba(255,255,255,.6)'><h4 align='center'>loading...</h4></div>";

										var nextTitle = 'My new page title';
										var nextState = { additionalInformation: 'Updated the URL with JS' };
										window.history.pushState(nextState, nextTitle, nextURL);
										window.history.replaceState(nextState, nextTitle, nextURL);
										fetch(nextURL).then(res => res.text()).then((responseText) => {
											const doc = new DOMParser().parseFromString(responseText, 'text/html');
											const elm = doc.querySelector(`.cube-content${this.getAttribute("cube-content")}`).innerHTML;
											var NewElm = document.createRange().createContextualFragment(elm);
											cubeContent.innerHTML = "";
											cubeContent.append(NewElm)
										});
									}




									setTimeout(()=>{
										cb.style.transform = goToPos;
										setTimeout(()=>{

											cubeContainer.classList.add("choosen")
											gotoside.classList.add("side-active")

											setTimeout(()=>{
												if (cubeContent) {
													cubeContent.classList.add("content-active")
												}
												setTimeout(()=>{
													document.querySelector(".mask-content").style.zIndex = 1

													const boxSlideEndEvent = new Event('boxSlideEnd');
													this.addEventListener('boxSlideEnd', function (e) {}, false);
													this.dispatchEvent(boxSlideEndEvent);
												},cubeTransition)
											},400)


										},cubeTransition)
									},cubeTransition+100)
								})
							},unChoosenTo)


					})
					gt.addEventListener('boxSlideStart',function(e){
						var dataAOS = document.querySelectorAll(".mask-content [data-aos]");
						if (dataAOS.length>0) {
							dataAOS.forEach((elAOS) => {
								if (elAOS.classList.contains("aos-animate")) {
									elAOS.classList.remove("aos-animate")
								}if (elAOS.classList.contains("aos-init")) {
									elAOS.classList.remove("aos-init")
								}
							});						
						}
						navbarHideToggle.click();
					})
					gt.addEventListener('boxSlideEnd',function(e){
						cubeRotate(".cube-content#main-content [cube-translate]");
						var dataAOS = document.querySelectorAll(".mask-content [data-aos]");
						if (dataAOS.length>0) {
							setTimeout(()=>{AOS.init();},500)
						}

						if(document.querySelectorAll(".cube-content#main-content #my-Interactive-Team").length>0){
							myTeam()
						}if(document.querySelectorAll(".cube-content#main-content #About-my-KA").length>0){
							aboutKA()
						}
					})
				})
			}
			navbarShowToggle.addEventListener("click",function(){
				if (!this.classList.contains("hide")) {
					this.classList.add("hide")
				}if (!document.querySelector(".navbar-menu").classList.contains("show")) {
					document.querySelector(".navbar-menu").classList.add("show")
				}
			})
			navbarHideToggle.addEventListener("click",function(){
				if (navbarShowToggle.classList.contains("hide")) {
					navbarShowToggle.classList.remove("hide")
				}if (document.querySelector(".navbar-menu").classList.contains("show")) {
					document.querySelector(".navbar-menu").classList.remove("show")
				}
			})

			var dataAOS = document.querySelectorAll(".mask-content [data-aos]");
			if (dataAOS.length>0) {
				AOS.init();
			}

			function myTeam(){
				const slideTeam = document.querySelectorAll(".userIDSlide")
				const teamLength = slideTeam.length
				const teamWidth = 360/slideTeam.length
				var teamNum = 0;
				slideTeam.forEach(st =>{
					st.style.transform = `rotateY(${teamWidth*teamNum++}deg) translateZ(-312px) translateY(-50%)`;
				})
				const prevUserID = document.querySelector("#prevUserID")
				const nextUserID = document.querySelector("#nextUserID")

				var userRotate = 0;

				nextUserID.addEventListener("click",function(){
					userRotate -= teamWidth;
					document.querySelector(".userIDContainer").style.transform = `translateY(-50%) rotateY(${userRotate}deg)`;
				})
				prevUserID.addEventListener("click",function(){
					userRotate += teamWidth;
					document.querySelector(".userIDContainer").style.transform = `translateY(-50%) rotateY(${userRotate}deg)`;
				})
			}

			function aboutKA(){
				const studioCam = document.querySelector(".lamp-glitch")
				const studioContent = document.querySelectorAll(".screen-content")
				const prevSudioContent = document.querySelector(".prevSudioContent")
				const nextSudioContent = document.querySelector(".nextSudioContent")
				const studioContentLen = studioContent.length-1;
				var currentStudioContent = 0;


				nextSudioContent.addEventListener("click",function(){
					studioCam.classList.add("active");

					var activeStudioContent = document.querySelectorAll(".screen-content.active")[0];
					if (activeStudioContent.classList.contains("active")) {

						setTimeout(()=>{
							activeStudioContent.classList.remove("active")
							if (activeStudioContent.nextSibling.nextSibling) {
								activeStudioContent.nextSibling.nextSibling.classList.add("active")
							}else{
								studioContent[0].classList.add("active")				
							}
							studioCam.classList.remove("active");
						},350)
					}
				})


				setInterval(()=>{
					nextSudioContent.click()
				},4000)

				function inactiveStudioContent(){
					studioContent.forEach(el=>{
						el.classList.remove("active");
						console.log(el)
					})
				}				
			}
