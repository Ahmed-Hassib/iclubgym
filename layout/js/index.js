let navbar = document.querySelector(".navbar");
let bmi_weight = document.querySelector("#weight");
let bmi_height = document.querySelector("#height");
let bmi_calc_btn = document.querySelector("#bmi-calc-btn");
let bmi_clac_container = document.querySelector(".bmi-calc");

(function () {
	window.addEventListener("scroll", (evt) => {
		evt.preventDefault();
		if (this.scrollY >= 100) navbar.classList.add("scrolled");
		else navbar.classList.remove("scrolled");
	});

	if (bmi_calc_btn != null) {
		bmi_calc_btn.addEventListener("click", (evt) => {
			evt.preventDefault();
			is_valid_inputs = true;
			// get weight value
			let weight = bmi_weight.value;
			// get height value
			let height = bmi_height.value;
			// check the value
			if (isNaN(weight) || weight == "" || isNaN(height) || height == "") {
				// create warning alert
				alert = create_alert(
					"please, enter valid height and weight.",
					"warning"
				);

				// remove alert after 10 sec
				setTimeout(() => {
					alert.remove();
				}, 10000);
			} else {
				// calculate bmi
				bmi_result = calc_bmi(weight, height);
				// bmi clasification
				bmi_class = bmi_classification(bmi_result);

				alert = create_alert(
					`your bmi is ${bmi_result} and you are ${bmi_class}`,
					"success"
				);

				// remove alert after 15 sec
				setTimeout(() => {
					alert.remove();
				}, 15000);
			}

			// check if alert was exist before
			if (bmi_clac_container.children[1] != undefined) {
				bmi_clac_container.children[1].remove();
			}

			// append alert
			bmi_clac_container.appendChild(alert);
		});
	}
})();

function calc_bmi(weight, height) {
	// get values and convert values into float ..
	var weight_kg = parseFloat(weight);
	var height_cm = parseFloat(height);
	// float values ..
	var height_m = height_cm / 100.0;
	var bmi_result = weight_kg / Math.pow(height_m, 2);
	bmi_result = bmi_result.toFixed(2);
	// compare values ..
	return bmi_result;
}

function bmi_classification(bmi) {
	// classification
	let classification_res;
	if (bmi < 18.5) {
		classification_res = "underweight";
	} else if (bmi > 18.5 && bmi < 24.9) {
		classification_res = "healthy";
	} else if (bmi > 25 && bmi < 29.9) {
		classification_res = "overweight";
	} else if (bmi > 30.0) {
		classification_res = "obese";
	}
	// return classification result
	return classification_res;
}

function create_alert(msg, type) {
	// alert container
	let alert_div = document.createElement("div");
	alert_div.classList.add(
		"alert",
		type == "warning" ? "alert-warning" : "alert-success",
		"alert-dismissible",
		"fade",
		"show"
	);
	alert_div.role = "alert";
	alert_div.id = "bmi-alert";
	// create icon status
	let icon = document.createElement("i");
	icon.classList.add(
		"bi",
		type == "warning" ? "bi-exclamation-triangle-fill" : "bi-check-all"
	);

	let bmi_txt_node = document.createElement("span");
	bmi_txt_node.textContent += msg;
	bmi_txt_node.classList.add("text-capitalize");
	bmi_txt_node.id = "bmi-msg";

	let close_btn = document.createElement("button");
	close_btn.type = "button";
	close_btn.classList.add("btn-close");
	close_btn.dataset.bsDismiss = "alert";
	close_btn.ariaLabel = "Close";

	alert_div.appendChild(icon);
	alert_div.appendChild(bmi_txt_node);
	alert_div.appendChild(close_btn);

	return alert_div;
}
