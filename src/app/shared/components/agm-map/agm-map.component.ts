import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/configs/config.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.scss']
})
// child component
export class AgmMapComponent implements OnInit {
  // @Input() customer:any;
  @Output() bookTitleCreated = new EventEmitter();
  map: any;
  drawingManager: any;
  centerMarker: any = undefined;
  centerMarkerLatLng: string = "";
  data: any;
  isHide: boolean = false;
  selectedRecord: any = null;
  subscribeCls!: Subscription;
  centerMarkerRadius = "";
  newRecord: any = {
    latLng: "",
    polygonText: "",
    geofenceType: 0,
    radius: 0,
    resetData: function () {
      this.latLng = "";
      this.latLng = "";
      this.polygonText = "";
      this.geofenceType = 0;
      this.radius = 0;
    }
  };

  isShapeDrawn: boolean = false;
  @ViewChild('search') public searchElementRef?: ElementRef;


  constructor(private ngZone: NgZone, public configService: ConfigService,
    private mapsAPILoader: MapsAPILoader,) {

  }

  ngOnInit(): void {
    // console.log(this.customer);
    // this.data = {
    //   newRecord: {
    //     "latLng": '85.74184845,22.82044971',
    //     "polygonText": "84.95083282 24.93995190",
    //     "geofenceType": 1,
    //     "distance": 95145.8,
    //   }
    // }
  }

  onMapReady(map: any) {
    this.isHide = this.data?.isHide || false;
    let self = this;
    this.map = map;
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [google.maps.drawing.OverlayType.POLYGON, google.maps.drawing.OverlayType.CIRCLE],
      },
      circleOptions: {
        fillColor: "#00FF00",
        strokeColor: "#00FF00",
        clickable: false,
        editable: true,
        zIndex: 1,
      },
      polygonOptions: {
        fillColor: "#00FF00",
        strokeColor: "#00FF00",
        draggable: true,
        editable: true,
      },
      map: map
      //drawingMode: google.maps.drawing.OverlayType.POLYGON
    });

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef?.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          map.setZoom(16);
          map.setCenter({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
          if (this.centerMarker == undefined) {
            this.centerMarker = new google.maps.Marker({
              map: map,
              draggable: true
            })
            this.centerMarker.addListener('dragend', (evt: any) => {
              this.centerMarkerLatLng = "Long, Lat:" + evt.latLng.lng().toFixed(6) + ", " + evt.latLng.lat().toFixed(6);
              this.centerMarker.panTo(evt.latLng);
            });
          }
          this.centerMarker.setPosition({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
          this.centerMarkerLatLng = "Long, Lat:" + place.geometry.location.lng().toFixed(6) + ", " + place.geometry.location.lat().toFixed(6);
        });
      });
    })

    //self.updatePointList(this.data?.selectedRecord.polygonText);


    //debugger

    if (this.data?.newRecord.geofenceType == 1) {
      //this.pointList.drawnPolytext = this.data?.drawnPolytext;
      var OBJ_fitBounds = new google.maps.LatLngBounds();
      const path = this.data?.newRecord.polygonText.split(',').map((x: any) => { let obj = { lng: Number(x.split(' ')[0]), lat: Number(x.split(' ')[1]) }; OBJ_fitBounds.extend(obj); return obj });
      const existingShape = new google.maps.Polygon({ paths: path, strokeColor: "#00FF00", strokeOpacity: 0.8, strokeWeight: 2, fillColor: "#00FF00", fillOpacity: 0.35, editable: true, draggable: true });
      existingShape.setMap(map);
      map.setCenter(this.FN_CN_poly2latLang(existingShape));
      map.fitBounds(OBJ_fitBounds);
      //this.setSelection(existingShape, "polygon");

      google.maps.event.addListener(existingShape, 'dragend', (e) => {
        this.ngZone.run(() => {
          this.setSelection(existingShape, "polygon")
        })
      });
      google.maps.event.addListener(existingShape.getPath(), 'set_at', (e) => {
        this.ngZone.run(() => {
          this.setSelection(existingShape, "polygon")
        })
      })
      google.maps.event.addListener(existingShape.getPath(), 'insert_at', (e) => {
        this.ngZone.run(() => {
          this.setSelection(existingShape, "polygon")
        })
      })
      google.maps.event.addListener(existingShape.getPath(), 'remove_at', (e) => {
        this.ngZone.run(() => {
          this.setSelection(existingShape, "polygon")
        })
      })
    }
    if (this.data?.newRecord.geofenceType == 2) {
      let latlng = new google.maps.LatLng(this.data?.newRecord.latLng.split(",")[1], this.data?.newRecord.latLng.split(",")[0]);
      let circle = new google.maps.Circle({
        strokeColor: '#00FF00',
        fillColor: '#00FF00',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        map: map,
        //position: latlng,
        center: latlng,
        radius: this.data?.newRecord.radius,
        draggable: true,
        editable: true
      });
      this.setZoomLevel(this.data?.newRecord.radius)
      map.panTo(latlng);
      google.maps.event.addListener(circle, 'radius_changed', () => {
        this.ngZone.run(() => {
          this.setSelection(circle, "circle");
        })
        //$('#geofenceLatlong').val("");
        //$('#GeofenceRemove').addClass('disabledUpdate');
      });
      google.maps.event.addListener(circle, 'dragend', (e) => {
        this.ngZone.run(() => {
          this.setSelection(circle, "circle");
        })
      });
      google.maps.event.addListener(circle, 'center_changed', (e) => {
        this.ngZone.run(() => {
          this.setSelection(circle, "circle");
        })
      });

    }

    if (this.data?.alreadyExistMapAryObj.length > 0) {
      var OBJ_fitBounds = new google.maps.LatLngBounds();
      this.data?.alreadyExistMapAryObj.forEach((obj: any) => {
        let hc = "<table><tbody>";
        hc += '<tr><td colspan="2"><h4>Existing Thana details</h4></td></tr>';
        hc += '<tr><td>Thana Name</td><td>: ' + (obj.thanaName || "-") + '</td></tr>';
        hc += '<tr><td>Zone Name</td><td>: ' + (obj.zoneName || "-") + '</td></tr>';
        hc += '<tr><td>Division</td><td>: ' + (obj.division || "-") + '</td></tr>';
        hc += '<tr><td>Contact No.</td><td>: ' + (obj.contactNo || "-") + '</td></tr>';
        hc += '<tr><td>Email Id</td><td>: ' + (obj.emailId || "-") + '</td></tr>';
        hc += '<tr><td>Incharge Name</td><td>: ' + (obj.inchargeName || "-") + '</td></tr>';
        hc += '<tr><td>Incharge Contact No.</td><td>: ' + (obj.inchargeContactNo || "-") + '</td></tr>';
        hc += '<tr><td>latitude</td><td>: ' + (obj.latitude || "-") + '</td></tr>';
        hc += '<tr><td>longitude</td><td>: ' + (obj.longitude || "-") + '</td></tr>';
        hc += '<tr><td>polygonText</td><td>: ' + (obj.polygonText || "-") + '</td></tr>';
        hc += "</tbody></table>";

        const info = new google.maps.InfoWindow({
          content: hc
        })

        if (obj.geofenceType == 1) {
          const path = obj.polygonText.split(',').map((x: any) => { let obj = { lng: Number(x.split(' ')[0]), lat: Number(x.split(' ')[1]) }; OBJ_fitBounds.extend(obj); return obj });
          const poly = new google.maps.Polygon({ paths: path, map: map, strokeColor: "#0000FF", strokeOpacity: 0.8, strokeWeight: 2, fillColor: "#0000FF", fillOpacity: 0.35, editable: false, draggable: false });
          let latLng = this.FN_CN_poly2latLang(poly);
          const marker = new google.maps.Marker({ map: map, draggable: false, position: latLng });
          OBJ_fitBounds.extend(latLng);
          marker.addListener('click', () => {
            info.open(map, marker);
          })
        }

        if (obj.geofenceType == 2) {
          let latlng = new google.maps.LatLng(obj.polygonText.split(" ")[1], obj.polygonText.split(" ")[0]);
          let circle: any = new google.maps.Circle({
            strokeColor: '#0000FF',
            fillColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillOpacity: 0.35,
            map: map,
            //position: latlng,
            center: latlng,
            radius: obj.distance,
            draggable: false,
            editable: false
          });
          OBJ_fitBounds.extend(latlng);
          const marker = new google.maps.Marker({ map: map, draggable: false, position: latlng });
          OBJ_fitBounds.extend(latlng);
          marker.addListener('click', () => {
            info.open(map, marker);
          })
        }
      });
      map.fitBounds(OBJ_fitBounds);
    }


    this.isHide && this.drawingManager.setDrawingMode(null);

    google.maps.event.addListener(
      this.drawingManager,
      'overlaycomplete',
      (e) => {
        this.isShapeDrawn = true;
        var newShape = e.overlay;

        if (e.type == 'polygon' || e.type == 'circle') { this.drawingManager.setDrawingMode(null); }

        google.maps.event.addListener(newShape, 'radius_changed', () => {
          this.ngZone.run(() => {
            this.setSelection(newShape, "circle");
          })
        });
        google.maps.event.addListener(newShape, 'dragend', (e) => {
          this.ngZone.run(() => {
            this.setSelection(newShape, this.newRecord.geofenceType);
          })
        });
        //debugger
        this.setSelection(newShape, e.type);
      }
    );
  }

  FN_CN_poly2latLang(poly: any) {
    var lowx,
      highx,
      lowy,
      highy,
      lats = [],
      lngs = [],
      vertices = poly.getPath();
    for (var i = 0; i < vertices.length; i++) {
      lngs.push(vertices.getAt(i).lng());
      lats.push(vertices.getAt(i).lat());
    }
    lats.sort();
    lngs.sort();
    lowx = lats[0];
    highx = lats[vertices.length - 1];
    lowy = lngs[0];
    highy = lngs[vertices.length - 1];
    const center_x = lowx + ((highx - lowx) / 2);
    const center_y = lowy + ((highy - lowy) / 2);
    return (new google.maps.LatLng(center_x, center_y));
  }

  setSelection(shape: any, type: string) {
    this.clearSelection(false);
    this.newRecord.geofenceType = type;
    type == 'circle' && (this.newRecord.circle = shape, this.newRecord.circle.setMap(this.map), this.newRecord.circle.setEditable(true), this.newRecord.centerMarkerLatLng = this.getLanLongFromCircle(shape), this.newRecord.radius = +shape.getRadius().toFixed(2))
    type == 'polygon' && (this.newRecord.polygon = shape, this.newRecord.polygon.setMap(this.map), this.newRecord.polygon.setEditable(true), this.newRecord.centerMarkerLatLng = this.getCenterLanLongFromPolygon(shape), this.newRecord.radius = 0, this.centerMarkerRadius = '')
    try {
      var ll = new google.maps.LatLng(+this.centerMarkerLatLng.split(',')[1], +this.centerMarkerLatLng.split(',')[0]);
      this.map.panTo(ll);
    }
    catch (e) { }
  }

  clearSelection(isAllClear: any) {
    this.newRecord.polygon && (this.newRecord.polygon.setEditable(false), this.newRecord.polygon.setMap(null), this.newRecord.polygon = undefined);
    this.newRecord.circle && (this.newRecord.circle.setEditable(false), this.newRecord.circle.setMap(null), this.newRecord.circle = undefined);
    //$('#Latlng, #geofenceRadius').val("");
    this.centerMarkerLatLng = "";
    this.centerMarkerRadius = "";
    this.newRecord.geofenceType = "";
    this.newRecord.polygontext = "";
    this.newRecord.radius = 0;
    if (this.selectedRecord && !isAllClear) {
      if (this.selectedRecord.geofenceData) {
      }
    }
  }

  getLanLongFromCircle(circle: any) {
    var lat = circle.getCenter().lat().toFixed(8);
    var long = circle.getCenter().lng().toFixed(8);
    this.newRecord.polygontext = long + ' ' + lat;
    return long + ',' + lat;
  }
  getCenterLanLongFromPolygon(polygon: any) {
    let bounds = new google.maps.LatLngBounds();
    var paths = polygon.getPaths();
    this.newRecord.polygontext = "";
    var tempPolygonText: any[] = [];
    paths.forEach(function (path: any) {
      var ar = path.getArray();
      for (var i = 0, l = ar.length; i < l; i++) {
        tempPolygonText[tempPolygonText.length] = ar[i].lng().toFixed(8) + ' ' + ar[i].lat().toFixed(8);
        bounds.extend(ar[i]);
      }
    })
    tempPolygonText[tempPolygonText.length] = tempPolygonText[0];
    this.newRecord.polygontext = tempPolygonText.join();
    return bounds.getCenter().lng().toFixed(8) + ',' + bounds.getCenter().lat().toFixed(8);
  }

  setZoomLevel(radius: number) {
    let zoom = 8;
    if (radius < 500) {
      zoom = 16;
    }
    else if (radius < 1000) {
      zoom = 14;
    }
    else if (radius < 2000) {
      zoom = 14;
    }
    else if (radius < 3000) {
      zoom = 12;
    }
    else if (radius < 5000) {
      zoom = 10;
    }
    else if (radius < 15000) {
      zoom = 10;
    }
    console.log(zoom);
    this.map.setZoom(zoom)
  }

  removeShape() {
    this.isShapeDrawn = false;
    this.clearSelection(false);
  }

  ngSubmit() {
    this.newRecord.latLng = this.newRecord?.centerMarkerLatLng;
    let obj = {
      "latitude": +this.newRecord.latLng.split(",")[1],
      "longitude": +this.newRecord.latLng.split(",")[0],
      "polygonText": this.newRecord?.polygontext,
      "geofenceType": this.newRecord?.geofenceType,
      "distance": this.newRecord?.radius,
    }
    this.bookTitleCreated.emit(obj);

  }


}
