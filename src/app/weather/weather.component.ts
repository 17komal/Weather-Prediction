import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor( private WeatherService:WeatherService,) { }
  
 city :string;
 WeatherData :any;
 result :any;
 showData :boolean;
 showError:boolean;
 error :string;
  ngOnInit(): void {
    this.WeatherData = {  };
    this.showData = false;
  }

  check(city)
  {
    this.getWeatherData(city);
  }
  
  getWeatherData(city)
  {
    if(city)
    {
      this.WeatherService.getWeatherData(city)
      .subscribe(    (res:any) => {     
        console.log(res); 
        data => console.log('success', data);
        error => console.log('oops', error);
        this.setWeatherData(res);       
      });
    }
    else
    {
      this.showError = true;
      this.error = 'Please Enter City';
    }
      
  }

  setWeatherData(res)
  {
    this.WeatherData.name = res['name'];
    this.WeatherData.date = new Date(res['dt'] * 1000);
    this.WeatherData.weather =  res['weather'][0]['main'];
    this.WeatherData.icon =  res['weather'][0]['icon'];
    this.WeatherData.windSpeed = res['wind']['speed'];
    this.WeatherData.temp =(res['main']['temp'] - 273.15).toFixed(0);
    this.WeatherData.humidity = res['main']['humidity'];
    this.WeatherData.sunrise = new Date(res['sys']['sunrise'] * 1000);
    this.WeatherData.sunset = new Date(res['sys']['sunset'] * 1000);
    this.showData = true;
    
  }

  Changed(city)
  {
    if(city)
    {
      this.showError = false;
      this.showData = false;
    }


  }
}
