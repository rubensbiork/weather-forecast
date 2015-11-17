describe( 'weather section', function() {
  var mockedAPI = {
    getWeatherForCity: function (woID) { return {};},
    getCitiesByName: function (name) { return {};}
  };
  beforeEach( module( 'company.weather' ) );
  beforeEach(module(function ($provide) {
    $provide.value('yahooAPI', mockedAPI);
  }));

  it( 'should have a dummy test', inject( function() {
    expect( true ).toBeTruthy();
  }));
});

