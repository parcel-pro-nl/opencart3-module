<?php

class ControllerExtensionModuleParcelpro extends Controller{

    public function post_order_add($route, $output){
        $order_id = $output[0];
        // append return $order_info; in catalog/model/checkout/order.php
        if($this->config->get('shipping_parcel_pro_auto_export_status') !== "*"){
            $this->load->model('checkout/order');
            $order = $this->model_checkout_order->getOrder($order_id);

            if($order['order_status_id'] === $this->config->get('shipping_parcel_pro_auto_export_status')){
                if(empty($order['su_order_id'])) {
                    $ParcelPro_API = Parcelpro::get_instance($this->registry);
                    $data = $ParcelPro_API->format_order_data($order);
                    if(
                        !empty($data['shipping_firstname'])
                        && !empty($data['shipping_lastname'])
                        && !empty($data['shipping_address_1'])
                        && !empty($data['nummer'])
                        && !empty($data['shipping_postcode'])
                        && !empty($data['shipping_city'])
                        && !empty($data['shipping_country'])

                    ){
                        $submit_result = $ParcelPro_API->submitShipping($data);

                        if($submit_result){
                            $saving_data = array(
                                'su_order_id' => $submit_result['Id'],
                                'su_url_tracking' => $submit_result['TrackingUrl'],
                                'su_url_label' => $submit_result['LabelUrl'],
                                'su_barcode' => $submit_result['Barcode'],
                                'su_barcodes' => '',
                                'su_colli' => 1,
                            );

                            $ParcelPro_API->saveSuData($order_id, $saving_data);
                        }
                    }
                }
            }
        }
    }
}
