document.addEventListener("DOMContentLoaded",()=>{
    const btnQ = document.querySelectorAll('.btn-question'),
         
          arrQuestions = [
            {
              text: 'Мы расскажем Вам не только подробности вашей смерти, но также поможем Вам избежать этой ужасной даты и продлить вашу жизнь на многие годы.',
              header: 'Когда Вы чувствуете себя наиболее комфортно?',
              elem1: createElement('button','btn-answer', 'btn-anim', 'Утро'),
              elem2: createElement('button','btn-answer', 'btn-anim', 'День'),
              elem3: createElement('button','btn-answer', 'btn-anim', 'Вечер'),
              elem4: createElement('button','btn-answer', 'btn-anim', 'Ночь')
            },
            {
              text:'Уже совсем скоро Вы узнаете много интересного о своем будущем!',
              header:'Укажите свою дату рождения:',
              elem1: createSelect('select__item','days',getDays()),
              elem2: createSelect('select__item','month',getMonth()),
              elem3: createSelect('select__item','years',getYears()),
              elem4: createElement('button','btn-answer', 'btn-anim', 'Далее')
            },
            {}, 
            {
              text: 'Смерть родного человека – одно из тяжелейших испытаний в жизни каждого из нас!',
              header: 'Снятся ли Вам умершие люди?',
              elem1: createElement('button','btn-answer', 'btn-anim', 'Да'),
              elem2: createElement('button','btn-answer', 'btn-anim', 'Нет'),
              elem3: createElement('button','btn-answer', 'btn-anim', 'Иногда')
            },
            {
              message: 'По вам скучает очень близкий человек, которого больше нет в мире живых.',  
              message2: 'По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это дедушка или бабушка.',
              message3: 'По вам скучает очень близкий человек, которого больше нет в мире живых. Возможно это кто-то из Ваших родителей.',   
              header: 'Запись, которую Вы услышите, может шокировать людей с неокрепшей психикой. Вы готовы узнать, что ждет именно Вас?',
              elem1: createElement('button','btn-answer', 'btn-anim', 'Да'),
              elem2: createElement('button','btn-answer', 'btn-anim', 'Затрудняюсь ответить'),
            }
          ];
    let countQuestion = 1;
    let quizBlock = document.querySelector('.quiz__block');
    let age = '';
    
 
    document.querySelector('main').addEventListener('click', (e)=>{
      const target = e.target;


      if(target && target.classList.contains('btn-req')){
        let req = fetch('https://swapi.dev/api/people/1/').
        then((res)=>{
          return res.json();
        }).
        then((data)=>{
          showJson(data);
        }).
        catch((e)=>{
          document.querySelector('.main').innerHTML = `
            Ошибка получения данных: ${e.message}
          `;
        });

      }
      if(target && target.classList.contains('btn-answer') && !target.classList.contains('btn-question')){
        if(countQuestion === 5){
          refreshMessage();
        }else if(countQuestion === 6){
          recordAudio();
        }
        else{
          
        refreshQuestion();
        }
      }
    });
    btnQ.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            scrollTo(document.querySelector('.quiz__block'));
        });
    });

    function scrollTo(element){
        window.scrollTo({
            left:0,
            top:element.offsetTop-50,
            behavior:"smooth"
        });
    }
    // Scroll Effect
    function onEntry(entry) {
        entry.forEach(change => {
          if (change.isIntersecting) {
           change.target.classList.add('element-show');
          }
        });
      }
      
      let options = {
        threshold: [0.5] };
      let observer = new IntersectionObserver(onEntry, options);
      let elements = document.querySelectorAll('.element-animation');
      
      for (let elm of elements) {
        observer.observe(elm);
      }

      function refreshQuestion(){
        if(countQuestion ===  3){
          const loader = document.createElement('div');
          loader.classList.add('loader');
          document.body.prepend(loader);
          document.querySelector('.quiz-q').remove();
          document.querySelector('.loader').innerHTML +=`<div class="text__loading">Loading</div>`;
          document.querySelector('.loader').innerHTML += `
          <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          `;

         
          setTimeout(()=>{
            const el = document.querySelector('.loader');  
            el.remove();
            countQuestion++;
            window.scroll(0,0);
             refreshQuestion();
             
           },2000);
        }else if(countQuestion === 4){

          document.querySelector('main').innerHTML = quizBlock.innerHTML = `
          <div class="quiz-q ">

              <div class="quiz__text">
                ${arrQuestions[countQuestion-1].text}
                  
              <svg class="eye__svg">
                  <use xlink:href="sprite.svg#eye"></use>
              </svg>    
              </div>
              <span class="border-quiz"></span>
              <h3 class="quiz__header">${arrQuestions[countQuestion-1].header}</h3>
              <div class="btns btnsquiz">
              </div>
              <div class="quiz__num">Вопрос <span class="quiz__num-content">${countQuestion}-5</span></div>
              <svg class="planet__svg">
              <use xlink:href="sprite2.svg#planet"></use>
              </svg>
              
          </div>
          `;
          const btnsquiz = document.querySelector('.btnsquiz');
          btnsquiz.append(arrQuestions[countQuestion-1].elem1);
          btnsquiz.append(arrQuestions[countQuestion-1].elem2);
          btnsquiz.append(arrQuestions[countQuestion-1].elem3);
          countQuestion++;

        }else{
              document.querySelector('main').innerHTML = quizBlock.innerHTML = `
              <div class="quiz-q ">

                  <div class="quiz__text">
                    ${arrQuestions[countQuestion-1].text}
                      
                  <svg class="eye__svg">
                      <use xlink:href="sprite.svg#eye"></use>
                  </svg>    
                  </div>
                  <span class="border-quiz"></span>
                  <h3 class="quiz__header">${arrQuestions[countQuestion-1].header}</h3>
                  <div class="btns btnsquiz">
                  </div>
                  <div class="quiz__num">Вопрос <span class="quiz__num-content">${countQuestion+1}-5</span></div>
                  <svg class="planet__svg">
                  <use xlink:href="sprite2.svg#planet"></use>
                  </svg>
                  
              </div>
              `;
              const btnsquiz = document.querySelector('.btnsquiz');
              const quizQ = document.querySelector('.quiz-q');
              btnsquiz.append(arrQuestions[countQuestion-1].elem1);
              btnsquiz.append(arrQuestions[countQuestion-1].elem2);
              btnsquiz.append(arrQuestions[countQuestion-1].elem3);
              btnsquiz.append(arrQuestions[countQuestion-1].elem4);
              
              
              if(countQuestion === 2){
                const days = document.querySelector('.days');
                const month = document.querySelector('.month');
                const years = document.querySelector('.years');
                const btnNext = document.querySelector('.btn-answer');
                btnNext.classList.add('next-btn');
                
                quizQ.style.animation = 'none';
                days.addEventListener('change',()=>{
                  if(days.value !== 'День'){
                    days.classList.remove('red__border');
                  }
                });
                month.addEventListener('change',()=>{
                  if(month.value !== 'Месяц'){
                    month.classList.remove('red__border');
                  }
                });
                years.addEventListener('change',()=>{
                  if(years.value !== 'Год'){
                    years.classList.remove('red__border');
                  }
                });
                btnNext.addEventListener('click',(e)=>{
                  e.preventDefault();
                  days.classList.remove('red__border');
                  month.classList.remove('red__border');
                  years.classList.remove('red__border');
                  if(days.value === 'День'){
                    days.classList.add('red__border');
                  }else if(month.value === 'Месяц'){
                    month.classList.add('red__border');
                  }
                  else if(years.value === 'Год'){
                    years.classList.add('red__border');
                  }else{
                    countQuestion = 2;
                    age = 2021-(+years.value);
                    countQuestion++;
                    
                  quizQ.style.animation = 'anim-block 1s linear';
                  }
                });
              }else{
                ++countQuestion;
              }

              
              window.scroll(0,0);
            }


      }

      function refreshMessage(){

        let message = '';
        if(age>=18 && age<=35){
          message =arrQuestions[4].message;
        }else if(age>=36 && age <=45){
          message = arrQuestions[4].message2;
        }else if(age>=46){
          message = arrQuestions[4].message3;
        }else{  message =arrQuestions[4].message; }

        document.querySelector('main').innerHTML = quizBlock.innerHTML = `
              <div class="quiz-q ">

                  <div class="quiz__message">
                    ${message}
                      
                  <svg class="eye__svg">
                      <use xlink:href="sprite.svg#eye"></use>
                  </svg>    
                  </div>
                  <span class="border-quiz"></span>
                  <h3 class="quiz__header">${arrQuestions[countQuestion-1].header}</h3>
                  <div class="btns btnsquiz">
                  </div>
                  <div class="quiz__num">Вопрос <span class="quiz__num-content">${countQuestion}-5</span></div>
                  <svg class="planet__svg">
                  <use xlink:href="sprite2.svg#planet"></use>
                  </svg>
                  
              </div>
              `;
              const btnsquiz = document.querySelector('.btnsquiz');
              btnsquiz.append(arrQuestions[countQuestion-1].elem1);
              btnsquiz.append(arrQuestions[countQuestion-1].elem2);

              countQuestion++;
              window.scroll(0,0);
              
      }
      function createElement(tag,class1,class2,value){
        const elem = document.createElement(tag);
        elem.classList.add(class1,class2);
        elem.innerHTML = value;
        return elem;
      }
      function createSelect(class1,class2,value){
        const elem = document.createElement('select');
        elem.classList.add(class1);
        elem.classList.add(class2);
        
        value.forEach((item,i) =>{
          const opt = document.createElement('option');
          elem.append(opt);
          opt.append(item);
          opt.value = item;
        });
        return elem;
      }

      function getDays(month = '01'){
          let days = 0;
          let arr = ['День'];
        switch (month){
          case 'Месяц':
            days = 31;
            break;
          case '01':
            days = 31;
            break;
          case '02':
            days = 28;
            break;  
          case '03':
            days = 31;
            break;  
          case '04':
            days = 30;
            break;
          case '05':
            days = 31;
            break;
          case '06':
            days = 30;
            break;
          case '07':
            days = 31;
            break;
          case '08':
            days = 31;
            break;
          case '09':
            days = 30;
            break;
          case '10':
            days = 31;
            break;
          case '11':
            days = 30;
            break;
          case '12':
            days = 31;
            break;
        }
        
        for(let i = 2; i <= days; i++){
          if(i<10){
            arr[i-1] = '0' + `${i-1}` ;
          }else{
            arr[i-1] = `${i}`;
          }

        }
          return arr;

      }

      function getMonth(){
        return [
          'Месяц',
          '01',
          '02',
          '03',
          '03',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12'
        ];
      }

      function getYears(){
        let arr = [];

        for(let i = 0; i <= 70; i++){
          if(i === 0){
            arr[i] = 'Год';
          }else{
          arr[i] = 2020-i;
          }
        }
        return arr;
      }


      function recordAudio(){
        document.querySelector('.main').innerHTML = `
        <div class="center_audio">
        <svg class="micro">
        <use xlink:href="sprite2.svg#micro"></use>
    </svg>

    <div class="load__line"></div>
    <div class="numload">20%</div>
    <div class="textload">Запись сообщения</div>
        </div>
        `;
        const numload = document.querySelector('.numload');
        let counter = 0;
        setInterval(()=>{
          if(counter === 100){
            clearInterval();
          }else{
            counter+=1;
            numload.textContent = `${counter}%`
          }
        },37);

        setTimeout(()=>{
          endQuiz();
        },4100);
      }
   
      function endQuiz(){
        const date = new Date();
        let day = date.getDate()+1;
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        day = day < 10 ? '0'+day:day; 
        month = month <10 ? '0'+month:month;
        let s = `${day}.${month}.${year}`;
        document.querySelector('.main').innerHTML = `
      
    <div class="quiz__message answers-style">
    Спасибо за Ваши ответы!<br>
      <b>Мы подготовили для Вас персональную аудио запись с Вашим прогнозом.</b>
    </div>
<div class="text_last">
    Вы можете узнать, как повлиять на события, которые ожидают вас в ближайшем будущем. 

</div>
<div class="textblock text_change">
    <span class="text_change_upper">Первое значимое<br> событие может <br>произойти уже ${s}</span>, Вам надо быть готовым, что бы последствия не оказались необратимыми.

</div>
<div class="text_last">
    Нажмите на кнопку ниже прямо сейчас и наберите наш номер телефона. Прослушайте важную информацию!
</div>
<button class="btn-req btn-anim">Позвонить и прослушать</button>
<div class="down-text quiz-footer" tabindex="0">
    TERMENI SI CONDITII: ACESTA ESTE UN SERVICIU DE DIVERTISMENT. PRIN FOLOSIREA LUI DECLARATI CA AVETI 18 ANI IMPLINITI, 
</div>
<button class="show-more">Показать больше</button>
        `;

        const showmore = document.querySelector('.show-more');
        showmore.addEventListener('click',()=>{
            document.querySelector('.quiz-footer').style.height = 'auto';
        });
      }


      function showJson(data){
        const films = data.films;
        document.querySelector('.main').innerHTML = `

        <img src="https://media.contentapi.ea.com/content/dam/star-wars-battlefront-2/images/2019/08/swbf2-refresh-hero-large-heroes-page-luke-skywalker-16x9-xl.jpg.adapt.crop1x1.320w.jpg" alt="">
        <div class="luke__name">Name: ${data.name}</div>
        <div class="luke__height">Height: ${data.height}</div>
        <div class="luke__mass">Mass: ${data.mass}</div>
        <div class="luke__hair">Hair color: ${data.hair_color}</div>
        <div class="luke__skin">Skin color: ${data.skin_color}</div>
        <div class="luke__birth">birth year: ${data.birth_year}</div>
        <div class="luke__gender">gender: ${data.gender}</div>
        <ul class="films">Films: </ul>
        `;
        
        const filmUl = document.querySelector('.films');
        films.forEach(item=>{
          const li = document.createElement('li');
            li.textContent = item;
            filmUl.append(li);
        });
      }
});
// https://github.com/nick98kzmnko/date-of-death