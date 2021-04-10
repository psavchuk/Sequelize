
async function windowActions() {

    const form = document.querySelector(".userform");
    const search = document.querySelector("#search");
    const list = document.querySelector(".results")
    
    //const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

    //list
    //const data = await request.json();

    //const request = await fetch(endpoint);
        //.then(blob => blob.json())
        //.then(data => places.push(...data));

    //meals

    async function mealmacros() {

      const mealRequest = await fetch('/api/meals');
      const macroRequest = await fetch('/api/macros');
      const meals = await mealRequest.json();
      const macros = await macroRequest.json();
  
      const mealmacroResults = [];

      let randomInts = [];

      //highly inefficient
      const calories = [];
      const carbs = [];
      const cholesterol = [];
      const fat = [];
      const protein = [];
      const sodium = [];
  
      for (let i = 0; i < 10; i++) {
          let r = getRandomInt(meals.length);
          if(randomInts.includes(r))
          {
            i--;
          }
          else
          {
            randomInts.push(r);
          }
      }

      for (let i = 0; i < randomInts.length; i++) {
        const element = randomInts[i];
        mealmacroResults[i] = Object.assign(meals[element], macros[element]);
        calories.push({x: /*meals[element].meal_name*/ i, y: macros[element].calories});
        carbs.push({x: /*meals[element].meal_name*/ i, y: macros[element].carbs});
        cholesterol.push({x: /*meals[element].meal_name*/ i, y: macros[element].cholesterol});
        fat.push({x: /*meals[element].meal_name*/ i, y: macros[element].fat});
        protein.push({x: /*meals[element].meal_name*/ i, y: macros[element].proteins});
        sodium.push({x: /*meals[element].meal_name*/ i, y: macros[element].sodium});
        console.log(mealmacroResults[i]);
      }

      var chart = new CanvasJS.Chart("chartContainer", {
        axisX: {
          title: "Meal",
          titleFontSize: 24,
          valueFormatString: "string"
        },

        axisY: {
          title: "Macros",
          titleFontSize: 24
        },

        data: [{
          type: "stackedBar",
          name: "Calories",
          dataPoints: calories
        },
        {
          type: "stackedBar",
          name: "Carbohydrates",
          dataPoints: carbs
        },
        {
          type: "stackedBar",
          name: "Cholesterol",
          dataPoints: cholesterol
        },
        {
          type: "stackedBar",
          name: "Fat",
          dataPoints: fat
        },
        {
          type: "stackedBar",
          name: "Protein",
          dataPoints: protein
        },
        {
          type: "stackedBar",
          name: "Sodium",
          dataPoints: sodium
        }
      ]
      });

      chart.render();

      console.log(meals);
      console.log(macros);
    }


    //dining
    //const diningRequest = await fetch('/api/dining');
    //const places = await diningRequest.json();
    
    function displayTable()
    {
      const html = places.data.map(place => {
        return `
        <tr>
          <td>
            ${place.hall_id}
          </td>
          <td>
            ${place.hall_name}
          </td>
          <td>
            ${place.hall_address}
          </td>
        </tr>
        `
      }).join('');
  
      list.innerHTML += html;
    }



    /*function findMatches(wordToMatch, places) {
        return places.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.name.match(regex) || place.category.match(regex);
        });
    }

    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, places);
        if (event.target.value ==="")
        {
          list.innerHTML = "";
        }
        else 
        {
        const html = matchArray.map(place => {
          const regex = new RegExp(event.target.value, 'gi');
          const nameMatch = place.name.replace(regex, `<span class='hl'>${event.target.value}</span>`);
          const catMatch = place.category.replace(regex, `<span class='hl'>${event.target.value}</span>`)
            return `
                <div class="result">
                    <li>
                        <span class="name is-capitalized is-size-4">
                          ${nameMatch.toLowerCase()}
                        </span>
                        <span class="category is-capitalized">
                          ${catMatch.toLowerCase()}
                        </span>
                        <address>
                          ${place.address_line_1.toUpperCase()}<br>
                          ${place.zip}
                        </address>
                    </li>
                </div>
                `
        }).join('');

        list.innerHTML = html;
      }
    }

    search.addEventListener('change', displayMatches);
    search.addEventListener('keyup', (evt) => {
        displayMatches(evt)
    });*/
    
    mealmacros();

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomInt(max)
    {
      return Math.floor(Math.random() * max);
    }
}

window.onload = windowActions;