const header = document.querySelector("header"),
  sections = document.querySelectorAll("section"),
  headerSelectorLINE = document.querySelector("#headerSelectorLINE"),
  href =
    window.location.pathname.lastIndexOf(".html") >= 0
      ? window.location.href.slice(0, window.location.href.lastIndexOf("/") + 1)
      : window.location.origin + window.location.pathname;

console.log("href", href);

_start();
// --------------------------------------------------------------------------------------------------------------------------------------------------
function _start() {
  onClickFunc();
  section1();
  section2();

  function onClickFunc() {
    header.onclick = (e) => {
      let childs = header.firstElementChild.children,
        s = "";
      for (let index = 0; index < childs.length; index++) childs[index].style.opacity = "";
      e.target.style.opacity = 1;

      s = e.target.innerText;
      s = s.substring(s.length - 1);
      show("p" + s);
    };
    function show(id) {
      sections.forEach((section) => {
        if (section.id != id) section.style.display = "";
        else section.style.display = "block";
      });
    }
  }
  function section1() {
    const tit = sections[0].querySelector(".sectionTitle"),
      des = sections[0].querySelector(".sectionDes"),
      p1LINE = sections[0].querySelector(".p1LINE"),
      header = sections[0].querySelectorAll(".p1Nav");
    let datas = [];
    datas.push(
      new Data(
        "React",
        "Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, it's easy to try it out on a small feature in an existing project."
      )
    );
    datas.push(
      new Data(
        "Angular",
        "HTML is great for declaring static documents, but it falters when we try to use it for declaring dynamic views in web-applications. AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop."
      )
    );
    datas.push(
      new Data(
        "Ember",
        "Ember.js is an open-source JavaScript application framework, based on the model-view-controller (MVC) pattern. It allows developers to create scalable single-page web applications by incorporating common idioms and best practices into the framework. What is your favorite JS framework?"
      )
    );
    datas.push(
      new Data(
        "Design",
        "Graphic designers communicate ideas through text and image. Therefore, communication skills are critical to the job. However, communication is important in graphic design in other ways too."
      )
    );

    onClickFunc();

    tit.innerText = datas[0].tit;
    tit.id = 0;
    des.innerText = datas[0].des;
    header[0].style.color = "var(--mainC)";
    header[0].firstElementChild.style.color = "var(--mainC)";
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    function Data(tit, des) {
      this.tit = tit;
      this.des = des;
    }
    function onClickFunc() {
      let r;
      sections[0].querySelector("nav").onclick = (e) => {
        r = e.target.closest(".p1Nav");
        if (r && r.id != tit.id) {
          header.forEach((r) => {
            r.style.color = "";
            r.firstElementChild.style.color = "";
          });
          p1LINE.style.left = r.offsetLeft + "px";
          p1LINE.style.width = r.offsetWidth + "px";
          r.style.color = "var(--mainC)";
          r.firstElementChild.style.color = "var(--mainC)";
          switchData(r.id, r);
        }
      };

      function switchData(newID, node) {
        let body = sections[0].querySelector(".sectionBody");
        // let cloneNode = body.cloneNode(true);
        // cloneNode.setAttribute("data-fake", "true");
        let time = 300;
        tit.innerText = datas[newID].tit;
        tit.id = newID;
        des.innerText = datas[newID].des;
        // let bodyHeight = body.offsetHeight;
        // cloneNode.setAttribute(
        //   "style",
        //   `transition: all linear ${time}ms;transform-origin: top;transform: perspective(500px) rotateX(0deg);height: ${body.offsetHeight}px;transform-style: preserve-3d; position:absolute;top:39px;left:0;right:0`
        // );
        // body.setAttribute(
        //   "style",
        //   `transition: all linear ${time}ms;transform-origin: bottom;transform: perspective(500px) rotateX(0deg);transform-style: preserve-3d; `
        // );
      }
    }
  }
  function section2() {
    const section = sections[1];
    const list = section.querySelector(".playerList");
    const audio_DOM = section.querySelector("audio");

    const controller = section.querySelector(".playerController");
    _controllerPrototype();

    let audios = [];
    let audio_nodes = [];
    let shuffle = false;
    let loop = false;

    audio_DOM.volume = 0.1;

    _get_audio_information();
    _appendAudioToListDOM();
    _setAudioDOMOnStart();
    _setOnClick();
    _trackLengthBar();

    // ------------------------------------------------------------------------------------------------------------------------------------------------
    function _controllerPrototype() {
      // list
      controller["_playTrigger"] = function () {
        if (audio_DOM.readyState == 4) {
          audio_DOM.play();
          if (!audio_DOM.paused) {
            section.querySelector("#playerPlay").classList.add("active");
            section.querySelector(".playerMusicCover_").style.animationPlayState = "";
          }
        } else {
          audio_DOM.oncanplay = () => {
            audio_DOM.play();
            if (!audio_DOM.paused) {
              section.querySelector("#playerPlay").classList.add("active");
              section.querySelector(".playerMusicCover_").style.animationPlayState = "";
            }
          };
        }
      };
      controller["_pauseTrigger"] = function () {
        audio_DOM.pause();
        section.querySelector("#playerPlay").classList.remove("active");
        section.querySelector(".playerMusicCover_").style.animationPlayState = "paused";
      };
      controller["_trigger"] = function (nodeType) {
        if (nodeType) {
          this.querySelector(nodeType).classList.toggle("active");
        }
      };
    }
    function _get_audio_information() {
      let _idForAudioObj = 0;
      audios.push(new AudioObj("Kẻ Cắp Gặp Bà Già", "Kẻ Cắp Gặp Bà Già.mp3", "0.jpg"));
      audios.push(new AudioObj("Tình bạn diệu kỳ", "Tình bạn diệu kỳ.mp3", "1.jpg"));
      audios.push(new AudioObj("Whenever, Wherever", "Whenever, Wherever.mp3", "2.jpg"));
      audios.push(new AudioObj("Dj Scratch - Dancing With Your Ghost", "Dj Scratch - Dancing With Your Ghost.mp3", "3.jpg"));
      audios.push(new AudioObj("Nyanpasu", "Nyanpasu.mp3", "4.jpg"));
      audios.push(
        new AudioObj(
          "Anh Có Muốn Đưa Em Về Không Remix",
          "https://tainhac123.com/listen/anh-co-muon-dua-em-ve-khong-orinn-edm-remix-ngo-lan-huong.rhhhFvCKQa6u.html",
          "https://vcdn1-ione.vnecdn.net/2021/01/19/ngo-lan-huong1-9374-1611031839.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=kx-T4eSLyKuTjNvtNH1Egg",
          "Ngô Lan Hương"
        )
      );
      audios.push(
        new AudioObj(
          "Cafe Không Đường",
          "https://tainhac123.com/listen/cafe-khong-duong-jombie-ft-tkan-ft-bean.hPhCwnAGC2uE.html",
          "https://scontent-sin6-2.xx.fbcdn.net/v/t1.6435-9/122153335_204601281276322_2967761281933981578_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uDuSYjGifVIAX_22xGN&tn=VC56bvycyqK9imMw&_nc_ht=scontent-sin6-2.xx&oh=5c557a86d71f45b985db12545e7ccd33&oe=60DE3C1F",
          "Tkan x Jombie G5R"
        )
      );
      audios.push(
        new AudioObj(
          "Muộn rồi mà sao còn",
          "https://tainhac123.com/listen/muon-roi-ma-sao-con-son-tung-m-tp.6nAqBAZ3nxuV.html",
          "https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png",
          "Sơn Tùng MTP"
        )
      );

      // audios.push(new AudioObj("", "", "", ""));
      // --------------------------------------------------------------------------------------------------------------------------------------------
      function AudioObj(name, audioUrl, avatarUrl, singer) {
        this.name = name;

        if (audioUrl.startsWith("http")) {
          this.auSrc = audioUrl;
        } else this.auSrc = href + "res/audio/sect2/" + audioUrl;

        if (avatarUrl.startsWith("http")) {
          this.imSrc = avatarUrl;
        } else this.imSrc = href + "res/img/sect2/" + avatarUrl;

        this.id = _idForAudioObj++;
        // this.singer = "Ca sĩ: " + name + " :>";
        if (singer) {
          this.singer = `Ca sĩ: ${singer}`;
        } else this.singer = "Ca sĩ: Mình chưa cập nhật ca sĩ :>";
      }
    }
    function _appendAudioToListDOM() {
      audios.forEach((i) => _append(i));

      function _append(data) {
        let node = document.createElement("div");
        node.classList.add("playerItem");
        node.id = data.id;
        node.innerHTML = `
              <div class="playerItemAvatar" style="background-image: url('${data.imSrc}')">
                <div class="playerItemAvatar_"></div>
              </div>
              <div class="playerItemInfo">
                <p class="playerItemTitle">${data.name}</p>
                <p class="playerItemSinger">${data.singer}</p>
              </div>
              <div class="playerItemMore" title="This is useless button :>"><i class="ti-more"></i></div>`;
        audio_nodes.push(node);
        list.appendChild(node);
      }
    }
    function _setAudioDOMOnStart() {
      if (audios[0]) {
        const audio = audios[0];
        const name = section.querySelector(".playerMusicName");
        const cv = section.querySelector(".playerMusicCover_");
        audio_DOM.src = audio.auSrc;
        audio_DOM.id = audio.id;
        name.innerText = audio.name;
        audio_nodes[0].classList.add("active");
        cv.style.backgroundImage = `background-image: url('${audio.imSrc}')`;
        controller._pauseTrigger();

        // audio_DOM.oncanplay = controller._playTrigger;
      }
    }
    function _setOnClick() {
      const musicName = section.querySelector(".playerMusicName");
      const musicCover = section.querySelector(".playerMusicCover_");
      let clickedAfterDefay = false,
        last_clicked_nodeLIST = audio_nodes[0];

      list.onclick = _onclickList;
      controller.onclick = _onclickController;
      // --------------------------------------------------------------------------------------------------------------------------------------------
      function _onclickList(e) {
        if (e.target.closest(".playerItem") && !e.target.closest(".playerItemMore")) {
          _onclickTrigger(e.target.closest(".playerItem"));
        }

        function _onclickTrigger(node) {
          if (node.id) {
            if (last_clicked_nodeLIST && last_clicked_nodeLIST != node) {
              last_clicked_nodeLIST.classList.remove("active");
              node.classList.add("active");
              last_clicked_nodeLIST = node;
              // document.body.classList.toggle
              let audio = audios[node.id];

              // console.log(audio);
              musicName.innerText = audio.name;
              musicCover.style.backgroundImage = `url('${audio.imSrc}')`;

              audio_DOM.src = audio.auSrc;
              audio_DOM.id = audio.id;
              controller._pauseTrigger();

              audio_DOM.oncanplay = controller._playTrigger;
            }
          }
        }
      }
      function _onclickController(e) {
        if (e.target.closest(".playerControllerBtn")) {
          _onclickTrigger(e.target.closest(".playerControllerBtn"));
        }
        // ------------------------------------------------------------------------------------------------------------------------------------------
        function _onclickTrigger(node) {
          // console.log(node.classList);
          switch (node.id) {
            case "playerPlay":
              if (node.classList.contains("active")) {
                controller._pauseTrigger();
              } else {
                controller._playTrigger();
              }
              break;
            case "playerNext":
              if (last_clicked_nodeLIST.id < audios.length - 1) {
                audio_nodes[parseInt(last_clicked_nodeLIST.id) + 1].click();
              } else {
                audio_nodes[0].click();
              }
              break;
            case "playerPrev":
              if (last_clicked_nodeLIST.id > 0) {
                audio_nodes[parseInt(last_clicked_nodeLIST.id) - 1].click();
              } else {
                audio_nodes[audio_nodes.length - 1].click();
              }
              break;
            case "playerSuf":
              controller._trigger("#" + node.id);
              if (controller.querySelector("#playerSuf").classList.contains("active")) {
                shuffle = true;
              } else {
                shuffle = false;
              }
              break;
            case "playerRepeat":
              controller._trigger("#" + node.id);
              if (controller.querySelector("#playerRepeat").classList.contains("active")) {
                loop = true;
                audio_DOM.setAttribute("loop", "true");
              } else {
                loop = false;
                audio_DOM.removeAttribute("loop");
              }
              break;
          }
          last_clicked_nodeBTN = node;
        }
      }
    }
    function audioTimeConverter(time) {
      let result = "";
      // 00:00
      result = time < 10 ? "00:0" + parseInt(time) : "00:" + parseInt(time);
      if (time > 59) {
        let m, s;
        m = parseInt(time / 60);
        s = parseInt(time % 60);

        s = s < 10 ? `0${s}` : s + "";
        result = m < 10 ? `0${m}:${s}` : `${m}:${s}`;
        if (m > 59) {
          let h;
          h = parseInt(m / 60);
          m %= 60;

          m = m < 10 ? `0${m}` : m + "";
          result = h < 10 ? `0${h}:${m}:${s}` : `${h}:${m}:${s}`;
          if (h > 23) {
            let d;
            d = parseInt(h / 24);
            h %= 24;

            h = h < 10 ? `0${h}` : h + "";
            result = `${d}:${h}:${m}:${s}`;
          }
        }
      }
      return result;
    }
    function _trackLengthBar() {
      const bar = section.querySelector(".playerProgressed");
      const timeStatus = bar.querySelector(".onHover");
      let __interval;

      _actionWithBar();

      audio_DOM.ondurationchange = () => {
        console.log("duration change");
        // console.log("timeStatus in duration");
        // console.log(e);
        clearInterval(__interval);
        bar.style.width = `${(audio_DOM.currentTime / audio_DOM.duration) * 100}%`;
        timeStatus.innerText = audioTimeConverter(audio_DOM.currentTime) + " / " + audioTimeConverter(audio_DOM.duration);
      };
      audio_DOM.onplaying = () => {
        console.log("playing");
        clearInterval(__interval);
        __interval = setInterval(() => {
          // console.log("timeStatus in playing");
          bar.style.width = `${(audio_DOM.currentTime / audio_DOM.duration) * 100}%`;
          timeStatus.innerText = audioTimeConverter(audio_DOM.currentTime) + " / " + audioTimeConverter(audio_DOM.duration);
        }, 100);
      };
      audio_DOM.onended = () => {
        clearInterval(__interval);
        console.log("loop", loop, "shuffle", shuffle);
        controller._pauseTrigger();

        if (!loop && !shuffle) {
          if (audio_DOM.id < audios.length - 1) {
            audio_nodes[parseInt(audio_DOM.id) + 1].click();
          } else {
            audio_nodes[0].click();
          }
        }
        if (!loop && shuffle) {
          let randomId = parseInt(Math.random() * audios.length);
          if (randomId == audio_DOM.id) {
            while (randomId == audio_DOM.id) {
              randomId = parseInt(Math.random() * audios.length);
            }
          }
          audio_nodes[randomId].click();
        }
        console.log("ended");
      };
      audio_DOM.onpause = () => {
        clearInterval(__interval);
        console.log("pause");
      };
      // --------------------------------------------------------------------------------------------------------------------------------------------
      function _actionWithBar() {
        const barBG = section.querySelector(".playerProgress");
        let down = false,
          xClientOnDown,
          xOffsetOnDown,
          percentage,
          playing;

        barBG.onmousedown = (e) => {
          if (!audio_DOM.paused) playing = true;
          else playing = false;
          controller._pauseTrigger();
          down = true;
          xClientOnDown = e.clientX;
          xOffsetOnDown = e.offsetX;
          // bar.style.transition = "none";
          barBG.classList.add("active");
          // console.log("down");
          // console.log("playing", playing);
          // console.log("bar.offsetWidth = ", barBG.offsetWidth);
          // xDown = e.offsetX;
          percentage = e.offsetX / barBG.offsetWidth;
          // console.log("bar.offsetWidth/ = ", percentage * 100);
          timeStatus.innerText = audioTimeConverter(audio_DOM.duration * percentage) + " / " + audioTimeConverter(audio_DOM.duration);
          bar.style.width = `${percentage * 100}%`;
        };
        window.addEventListener("mousemove", (e) => {
          // console.log(e.offsetX);
          // console.log(e);
          if (down) {
            bar.style.transition = "none";
            // console.log();
            percentage = (xOffsetOnDown + (e.clientX - xClientOnDown)) / barBG.offsetWidth;
            if (percentage > 1) percentage = 1;
            if (percentage < 0) percentage = 0;
            // console.log(e.screenX - xScreenDown);
            timeStatus.innerText = audioTimeConverter(audio_DOM.duration * percentage) + " / " + audioTimeConverter(audio_DOM.duration);
            bar.style.width = `${percentage * 100}%`;
          }
        });
        window.addEventListener("mouseup", (e) => {
          if (down) {
            // controller._playTrigger();
            down = false;
            bar.style.transition = "";
            barBG.classList.remove("active");
            audio_DOM.currentTime = audio_DOM.duration * percentage;
            console.log("playing", playing);
            if (!playing) {
              console.log("Stopped");
              // controller._pauseTrigger();
            }
          }
        });
      }
    }
  }
}
