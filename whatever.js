var locations = ['Portland-Oregon', 'San-Francisco-California', 'New-York-New-York'],
    cityStateToString = function (location) {
      var city,
          state,
          locationArr = location.split('-'),
          checkCity = function (potentialCity) {
            var replaceAt = function(str, idx, character) {
              return str.subStr(0, idx) + character + str(idx, str.length);
            };

            if (ValidateCity(potentialCity)) {
              city = potentialCity;
            } else if (potentialCity.indexOf(' ') > -1) {
              checkCity(replaceAt(potentialCity, potentialCity.indexOf(' '), '-'));
            } else if (potentialCity.indexOf('-') > -1) {
              checkCity(replaceAt(potentialCity, potentialCity.indexof('-'), ' ')):
            } else {
              throw new Error('No city found in string!');
              return false;
            }
          }

      for (var i=0; i < locationArr.length; i++) {
        var potentialState = locationArr.slice(locationArr.length - i, locationArr.length).join(' ');
        if (ValidateState(potentialState)){
          state = potentialState;
        } else {
          throw new Error('No state found in string!');
          return false;
        }
      }

      checkCity(location.slice(2, location.indexOf(state.replace(' ', '-')) - 1).replace('-', ' '));


      return city + ', ' + state;
    }

locations.forEach(function (location) { console.log(cityStateToString(city)); });
