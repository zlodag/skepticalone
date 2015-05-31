<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Discharge Summary</title>
        <script src="dc.js"></script>
        <link rel="stylesheet" type="text/css" href="dc.css">
    </head>
    <body>
        <form id="main_form" method="post" target=".">
            <fieldset>
                <div id="hosp_address" class="left">Waikato Hospital<br>Pembroke Street<br>Hamilton</div>
                <div id="hosp_team" class="right">Blue Team<br>General Medicine<br>Ward A2</div>
                <div class="left"><span id="pt_firstname">Eric Arthur</span> <span id="pt_surname">Blair</span><br><span id="pt_address">221b Baker Street<br>Bader<br>Hamilton</span></div>
                <div class="right">Date of birth: <span id="pt_dob">31/04/1956</span><br>NHI: <span id="pt_nhi">HUT5673</span></div>
                <div>
                    <hr>
                    Date of admission: <input type="date" name="admission_date" value="2015-02-27" readonly="readonly"><br>
                    Date of discharge: <input type="date" name="discharge_date" value="<?php echo date('Y-m-d'); ?>" required>
                </div>
            </fieldset>
            <fieldset>
                <legend>Diagnoses</legend>
                <ol id="diagnoses"></ol>
            </fieldset>
            <fieldset>
                <legend>Background</legend>
<textarea name="background" required>Ischaemic heart disease
- STEMI 2007, PCI to LAD
- NSTEMI 2009
Congestive heart failure
- LVEF 30% 2009
COPD
- FEV1 30% predicted 2010
- Ex-smoker, 80 pack-year smoking history
Type 2 diabetes
- diet-controlled
Chronic kidney disease stage IV
- baseline creatinine 150
Obstructive sleep apnoea
- unable to tolerate BIPAP
Dyslipidaemia
Depression
Bilateral total knee joint replacement
Osteoarthritis
Previous septic arthritis L elbow 2003</textarea>
            </fieldset>
            <fieldset>
                <legend>Presentation</legend>
                <textarea placeholder="Hx/Ex/Ix" required></textarea>
            </fieldset>
            <fieldset>
                <legend>Inpatient progress</legend>
                <textarea placeholder="Treatment/response/further issues" required></textarea>
            </fieldset>
            <fieldset>
                <legend>Plan</legend>
                <textarea required></textarea>
            </fieldset>
            <fieldset>
                <legend>Advice to patient</legend>
                <textarea placeholder="Optional"></textarea>
            </fieldset>
            <fieldset>
                <legend>Medications</legend>
                <table id="medtable">
                    <thead>
                        <tr>
                            <th>Drug</th>
                            <th>Admission</th>
                            <th class="hidden"></th>
                            <th>Discharge</th>
                            <th>&#8478;</th>
                            <th>Amount</th>
                            <th class="hidden"></th>
                        </tr>
                    </thead>
                    <tbody id="medtable_body">
                    </tbody>
                </table>
Add <input type="number" min="1" max="10" value="1" id="addnumber"> more: <button type="button" id="addmore">Add</button>
<button type="button" id="checkrx">Check Rx</button>
<hr>
<p id="replace"></p>
<table>
<caption>Current SA numbers</caption>
<tr>
<th>Drug</th>
<th>SA number</th>
<th>Expiry</th>
</tr>
<tr>
<td>Ticagrelor</td>
<td>123456789</td>
<td>June 2015</td>
</tr>
<tr>
<td>Enoxaparin</td>
<td>759472542</td>
<td>May 2017</td>
</tr>
<tr>
<td>peg-GCSF</td>
<td>649845623</td>
<td>Lifetime</td>
</tr>
</table>
            </fieldset>
            <input type="submit" value="Sign off">
        </form>
        <p><em><a href="http://validator.w3.org/check?uri=referer">[Validate HTML5]</a></em></p>
    </body>
</html>
