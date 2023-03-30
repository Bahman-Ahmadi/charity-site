$('.btn-copy')[0].onclick = () => {
    navigator.clipboard.writeText($('.wallet')[0].value);
    alert('Copied!');
}

function openFAQ(id){
    document.getElementById('a'+id).hidden = !document.getElementById('a'+id).hidden;
}

function replace(className, attr, value){
    // this function will find all matches class names with the <className> then replace <attr> value to <value>
    document.querySelectorAll(`.${className}`).forEach((el) => {
        el[attr] = value;
    });
} 

var db = {}
$.ajax({
	type: "GET",
	url: "dist/db.json",
	datatype: "json",
	async: false,
	success: function(data){
		db = data;
	}
});

replace('site-title', 'innerHTML', db.name);
replace('site-desc', 'innerHTML', db.description);
replace('count1', 'innerHTML', db.statistics.contributors);
replace('count2', 'innerHTML', db.statistics.supporting);
replace('count3', 'innerHTML', (new Date(new Date() - new Date(db.statistics.start_date)).getMonth()-1)*30);
replace('sentence', 'innerHTML', db.contribute.sentence);
replace('contribute-desc', 'innerHTML', db.contribute.description);
replace('wallet', 'value', db.contribute.wallet);
replace('history-text', 'innerHTML', db.history.description);
replace('donating', 'onclick', () => {prompt('you can copy our USDT wallet address from this field:', db.history.wallet)});
replace('ask-desc', 'innerHTML', db.asking.description);
replace('telegram', 'href', db.asking.telegram);
replace('email', 'href', db.asking.email);
var rnd = Math.floor(Math.random() * 3)+1;
document.getElementById("contribute").style = `background-image: url(dist/assets/s${rnd}.jpg);`;
var s_count = 1;
db.services.forEach((service) => {
    document.getElementById("services").innerHTML += `
<div class="service" id="s${s_count}">
    <div class="s-content">
        <p class="service-title">${service.title}</p>
        <p class="service-desc">${service.description}</p>
    </div>
</div>
    `;
    document.getElementById(`s${s_count}`).style = `background-image: url(${service.image});`;
    s_count++;
});
db.managers.forEach((manager) => {
    document.getElementById("managers").innerHTML += `
<div class="manager">
    <img class="manager-avatar" src="${manager.avatar}" alt="[MANAGER]">
    <p class="manager-name">${manager.name}</p>
    <p class="manager-position">${manager.position}</p>
</div>
    `;
});
db.contribute.boxes.forEach((box) => {
    document.getElementById("boxes").innerHTML += `
<tr>
    <td class="box-title">${box.title}</td>
    <td class="box-period">${box.period}</td>
    <td class="box-price">${box.price}</td>
</tr>
    `;
});
var f_count = 1;
db.FAQ.forEach((faq) => {
    document.getElementById("faqs").innerHTML += `
<div class="faq" id="f${f_count}">
    <p class="faq-title" onclick="openFAQ(${f_count});"><i class="drawer-ic bi bi-question-circle"></i> ${f_count}. ${faq.q}</p>
    <div class="faq-answer" id="a${f_count}" hidden><i class="bi bi-chat"></i> ${faq.a}</div>
</div>
    `;
    f_count++;
});