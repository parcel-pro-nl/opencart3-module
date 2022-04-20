function popup_close() {
    jQuery('#modal').hide();
}

function popup_submit(data) {
    AddressIsParcelshop(data);
}

function AddressIsParcelshop(data) {
    if (data) {
        jQuery("input[name=pp_firstname]").val(data.LocationType);
        jQuery("input[name=pp_lastname]").val(data.Name);
        jQuery("input[name=pp_company]").val(data.Id);
        jQuery("input[name=pp_address_1]").val(data.Street);
        jQuery("input[name=pp_address_2").val(data.Housenumber + data.HousenumberAdditional);
        jQuery("input[name=pp_postcode]").val(data.Postalcode);
        jQuery("input[name=pp_city]").val(data.City);
        //match = /^(.*)\-(\d+)$/.exec(data.LocationTypeId);
        //jQuery("input[name=country_id]").val('NL');
        var _od = window['_QuickCheckoutData'].order_data;
        _od['pp_gebruiker_id'] = $('input[name=pp_gebruiker_id]').val();
        _od['pp_firstname'] = $('input[name=pp_firstname]').val();
        _od['pp_lastname'] = $('input[name=pp_lastname]').val();
        _od['pp_company'] = $('input[name=pp_company]').val();
        _od['pp_address_1'] = $('input[name=pp_address_1]').val();
        _od['pp_address_2'] = $('input[name=pp_address_2]').val();
        _od['pp_postcode'] = $('input[name=pp_postcode]').val();
        _od['pp_city'] = $('input[name=pp_city]').val();
    }
    var firstname = jQuery("#shipping_method\\:firstname").val();
    var lastname = jQuery("#shipping_method\\:lastname").val();

    if (firstname == "DHL ParcelShop") {
        var label = jQuery('label[for="s_method_parcelpro_dhl_parcelshop"]');
        var price = jQuery('span', label);
        var priceHtml = jQuery('<div>').append(price.clone()).html();
        jQuery(label).html(firstname + " " + lastname + " <strong>" + priceHtml + "<strong>");

        return true;
    }
    if (firstname == "PostNL Pakketpunt") {
        var label = jQuery('label[for="s_method_parcelpro_postnl_pakjegemak"]');
        var price = jQuery('span', label);
        var priceHtml = jQuery('<div>').append(price.clone()).html();
        jQuery(label).html(firstname + " " + lastname + " <strong>" + priceHtml + "<strong>");
        return true;
    }
    if (firstname == "Intrapost Pickup point") {
        var label = jQuery('label[for="s_method_parcelpro_intrapost_pickup"]');
        var price = jQuery('span', label);
        var priceHtml = jQuery('<div>').append(price.clone()).html();
        jQuery(label).html(firstname + " " + lastname + " <strong>" + priceHtml + "<strong>");
        return true;
    }
    return false;
}

function ParcelProKiezerUrl() {
    var url = "https://login.parcelpro.nl/plugin/afhaalpunt/parcelpro-kiezer.html";
    var postcode = jQuery("input[name=postcode]").val() ? jQuery("input[name=postcode]").val() : jQuery("input[name=payment_postcode]").val();
    url += "?";
    url += "id=" + jQuery("input[name=pp_gebruiker_id]").val();
    url += "&postcode=" + postcode;
    url += "&adres=" + jQuery("input[name=address_1]").val();
    url += "&origin=" + window.location.protocol + "//" + window.location.hostname;

    return url;
}

window.addEventListener("message", function (event) {
    if (event.origin === "https://login.parcelpro.nl") {
        var msg = event.data;
        if (msg == "closewindow") {
            popup_close();
        } else {
            AddressIsParcelshop(msg);
            popup_close();
        }
    } else {
        console.log(event.origin + "!== https://login.parcelpro.nl");
    }
}, false);

jQuery(document).ready(function () {
    jQuery("input[name=shipping_method]").click(function () {
      value = $(this).val().slice(0, -2)
        if (value === 'parcel_pro.shipping_parcel_pro_type_id_3533') {
            jQuery('#modal').show();
            jQuery('#afhaalpunt_frame').attr('src', ParcelProKiezerUrl() + '&carrier=PostNL');
        }
        if (value === 'parcel_pro.shipping_parcel_pro_type_id_Parcelshop') {
            jQuery('#modal').show();
            jQuery('#afhaalpunt_frame').attr('src', ParcelProKiezerUrl() + '&carrier=DHL');
        }
        if (value === 'parcel_pro.shipping_parcel_pro_type_id_9') {
            jQuery('#modal').show();
            jQuery('#afhaalpunt_frame').attr('src', ParcelProKiezerUrl() + '&carrier=Intrapost');
        }
    });
});
