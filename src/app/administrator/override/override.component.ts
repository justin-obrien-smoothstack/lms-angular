import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-override",
  templateUrl: "./override.component.html",
  styleUrls: ["./override.component.css"],
})
export class OverrideComponent implements OnInit {
  overridableLoans: any;

  constructor(private overrideService: OverrideService) {}

  ngOnInit() {}
}
