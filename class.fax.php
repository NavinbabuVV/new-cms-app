<?php
//echo "123";exit;
  class fax extends restApi{ 
  public function fax_upload($fax_data){
	  //print_r($fax_data);exit;
      $user_id = $fax_data['user_id'];
	  $fax_user_id = $fax_data['fax_user_id'];
      $name = $fax_data['name'];
      $description = $fax_data['description'];
	  $type = $fax_data['type'];
      if(isset($_FILES["document_file"]))
        { 
          $destination_path = getcwd().DIRECTORY_SEPARATOR;            
          $main_document_upload_path = "https://".$_SERVER['SERVER_NAME']."/api/v1.0/fax_documents/". basename( $_FILES["document_file"]["name"]);  
		   $postfile = file_get_contents($_FILES['document_file']['tmp_name']);
          $main_document_target_path = $destination_path."fax_documents/". basename( $_FILES["document_file"]["name"]);
          move_uploaded_file($_FILES['document_file']['tmp_name'], $main_document_target_path);
          //$path = $_FILES['file']['name'];
          //$ext = pathinfo($path, PATHINFO_EXTENSION);
          //$token = $this->fax_curl();
		  $get_qry = "SELECT * FROM user WHERE user_id='$user_id' AND fax_user_id='$fax_user_id'";
          $results = $this->fetchData($get_qry,array());
          $user_name = $results['email_id'];
          $password = $results['password'];
          $token = $this->fax_curl_admin($user_name,$password);
          $url = 'https://myfax.mconnectapps.com/api/messages/documents';
          $data = array("name" =>$name,"description" =>$description,"type"=>$ext);
          $postdata = json_encode($data);
          $ch = curl_init($url);
          curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
          curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
          curl_setopt($ch, CURLOPT_POST, 1);
          curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);    
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
          curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
          curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/json',
          'Authorization: Bearer '.$token
          ));
          $result = curl_exec($ch);          
          curl_close($ch);
          $doc_id = $result;		  
          //add document......pdf adder............
          $url = 'https://myfax.mconnectapps.com/api/messages/documents/'.$doc_id.'/media';        		  
          $ch = curl_init($url);
          curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
          curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
          curl_setopt($ch, CURLOPT_POST, 1);
          curl_setopt($ch, CURLOPT_POSTFIELDS, $postfile);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
          curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/pdf'));
          curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/pdf',
          'Authorization: Bearer '.$token
          ));
          $result = curl_exec($ch);		  
          curl_close($ch);		  
		  $qry_result = $this->db_query("INSERT INTO fax_details(admin_id,doc_id,name,document,type,description) VALUES ('$user_id', '$doc_id', '$name', '$main_document_upload_path', '$type', '$description')", array());          
		  $results = array("status" => "true");          
          $tarray = json_encode($results);  
          print_r($tarray);exit;
        }         
    }
  
  public function get_docid($user_id){	    
        $qry = "SELECT * FROM `fax_details` WHERE admin_id = '$user_id'";
        return $this->dataFetchAll($qry, array());
    }
  public function get_contacts($data){
        extract($data);	  
        $qry = "SELECT phone FROM `contacts` WHERE phone LIKE '%$search_val%' AND admin_id = '$user_id'";
        return $this->dataFetchAll($qry, array());
    }  
  public function send_fax($fax_data){
        extract($fax_data);
        //$token = $this->fax_curl();
	    $get_qry = "SELECT * FROM user WHERE user_id='$user_id' AND fax_user_id='$fax_user_id'";
        $results = $this->fetchData($get_qry,array());
        $user_name = $results['email_id'];
        $password = $results['password'];
        $token = $this->fax_curl_admin($user_name,$password);
        $data1 = array("name" =>$title,"type" =>"sendfax","parent_id"=>'',"document_id"=>$doc_id);
        $postdata1 = json_encode($data1);        
        $p_id = $this->curl_fax_pid($postdata1,$token);
	    //echo $p_id;exit;
        $data2 = array("program_id" =>$p_id,"title" =>$title,"phone"=>$number,"try_allowed"=> $try_allowed);
        $postdata2 = json_encode($data2);
	    //print_r($postdata2);exit;
	    //echo $token;exit;
        $t_id = $this->curl_fax_tid($postdata2,$token);
	    //echo $t_id;exit;
        $this->curl_fax_transmission($t_id,$token);
	    $res = $this->curl_fax_transmissions($t_id,$token);	    
	    $status = $res[0]['status'];
	    $transmission_id = $res[0]['transmission_id'];
	    //print_r($res);exit;
	    $insert_qry = "INSERT INTO sent_fax(admin_id,doc_id,transmission_id,title,phone,status) VALUES ('$user_id', '$doc_id', '$transmission_id', '$title', '$number','$status')";
        $results = $this->db_query($insert_qry, array());
	    $result = array("status" => "true");          
        $tarray = json_encode($result);  
        print_r($tarray);exit;
    }
	public function sent_fax_list($user_id){  		
        $qry = "SELECT * FROM `sent_fax` WHERE admin_id = '$user_id'";
        return $this->dataFetchAll($qry, array());
    }
	public function delete_fax_document($fax_data){
          extract($fax_data);//print_r($fax_data);exit;         
          //$token = $this->fax_curl();
		  $get_qry = "SELECT * FROM user WHERE user_id='$user_id' AND fax_user_id='$fax_user_id'";
          $results = $this->fetchData($get_qry,array());
          $user_name = $results['email_id'];
          $password = $results['password'];
          $token = $this->fax_curl_admin($user_name,$password);
          $url = 'https://myfax.mconnectapps.com/api/messages/documents/'.$doc_id;          
		  $data = array();
          $data_json = json_encode($data);		  
          // curl intitite
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($ch, CURLOPT_POSTFIELDS,  $data_json );
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
          curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/json',
          'Authorization: Bearer '.$token
          ));
          $response  = curl_exec($ch);
          curl_close($ch);          
		  $deleteqry = "DELETE FROM fax_details WHERE doc_id='$doc_id' AND admin_id='$user_id'";
          $results = $this->db_query($deleteqry, array());
          $result = array("status" => "true");          
          $tarray = json_encode($result);  
          print_r($tarray);exit;                 
    }
	public function get_by_id($fax_data){
        extract($fax_data);
        $qry = "SELECT * FROM `fax_details` WHERE doc_id='$doc_id' AND admin_id = '$user_id'";
        return $this->fetchData($qry, array());
    }
	public function edit_fax_upload($fax_data){ 
	  //print_r($fax_data);exit;
      $user_id = $fax_data['user_id'];
	  $fax_user_id = $fax_data['fax_user_id'];	
      $doc_id = $fax_data['doc_id'];
      $name = $fax_data['name'];
      $description = $fax_data['description'];
      $type = $fax_data['type'];                 
      if(isset($_FILES["document_file"]))
        { 
          $destination_path = getcwd().DIRECTORY_SEPARATOR;            
          $main_document_upload_path = "https://".$_SERVER['SERVER_NAME']."/api/v1.0/fax_documents/". basename( $_FILES["document_file"]["name"]);  
          $main_document_target_path = $destination_path."fax_documents/". basename( $_FILES["document_file"]["name"]);
          move_uploaded_file($_FILES['document_file']['tmp_name'], $main_document_target_path);
          $postfile = file_get_contents($_FILES['document_file']['tmp_name']);
          //$path = $_FILES['file']['name'];
          //$ext = pathinfo($path, PATHINFO_EXTENSION);
          //$token = $this->fax_curl();
		  $get_qry = "SELECT * FROM user WHERE user_id='$user_id' AND fax_user_id='$fax_user_id'";
          $results = $this->fetchData($get_qry,array());
          $user_name = $results['email_id'];
          $password = $results['password'];
          $token = $this->fax_curl_admin($user_name,$password);
          $url = 'https://myfax.mconnectapps.com/api/messages/documents/'.$doc_id;
          $postArr = array("name" =>$name,"description" =>$description,"type"=>$type);
          $data_json = json_encode($postArr);
          // curl initiate
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_CUSTOMREQUEST,'PUT');
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($ch, CURLOPT_POSTFIELDS,  $data_json );
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
          curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/json',
          'Authorization: Bearer '.$token
          ));
          $response  = curl_exec($ch);
          curl_close($ch);
          $url = 'https://myfax.mconnectapps.com/api/messages/documents/'.$doc_id.'/media';
          // curl initiate
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_CUSTOMREQUEST,'PUT');
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($ch, CURLOPT_POSTFIELDS,  $postfile );
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/pdf'));
          curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/pdf',
          'Authorization: Bearer '.$token
          ));
          $response  = curl_exec($ch);
          curl_close($ch);
          $updateqry = "UPDATE fax_details SET name='$name',document='$main_document_upload_path',type='$type',description='$description' WHERE doc_id='$doc_id'";
          $qry_result = $this->db_query($updateqry, array());          
          $result = array("status" => "true");          
          $tarray = json_encode($result);  
          print_r($tarray);exit;
        }
		else{
          $get_qry = "SELECT document FROM fax_details WHERE doc_id='$doc_id'";
          $main_document_upload_path = $this->fetchmydata($get_qry,array());		 
          //$token = $this->fax_curl();
		  $get_qry = "SELECT * FROM user WHERE user_id='$user_id' AND fax_user_id='$fax_user_id'";
          $results = $this->fetchData($get_qry,array());
          $user_name = $results['email_id'];
          $password = $results['password'];
          $token = $this->fax_curl_admin($user_name,$password);
          $url = 'https://myfax.mconnectapps.com/api/messages/documents/'.$doc_id;
          $postArr = array("name" =>$name,"description" =>$description,"type"=>$type);
          $data_json = json_encode($postArr);
          // curl initiate
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_CUSTOMREQUEST,'PUT');
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($ch, CURLOPT_POSTFIELDS,  $data_json );
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
          curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/json',
          'Authorization: Bearer '.$token
          ));
          $response  = curl_exec($ch);
          curl_close($ch);
          /*$url = 'https://myfax.mconnectapps.com/api/messages/documents/'.$doc_id.'/media';
          // curl initiate
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_CUSTOMREQUEST,'PUT');
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($ch, CURLOPT_POSTFIELDS,  $postfile );
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/pdf'));
          curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/pdf',
          'Authorization: Bearer '.$token
          ));
          $response  = curl_exec($ch);
          curl_close($ch);*/
          $updateqry = "UPDATE fax_details SET name='$name',document='$main_document_upload_path',type='$type',description='$description' WHERE doc_id='$doc_id'";
          $qry_result = $this->db_query($updateqry, array());          
          $result = array("status" => "true");          
          $tarray = json_encode($result);  
          print_r($tarray);exit;
        }
    }
public function get_fax_stat(){
      $token = $this->fax_curl();
    $get_process="Select transmission_id from sent_fax where status='processing'";
   	 $res_sel = $this->dataFetchAll($get_process, array());

	foreach($res_sel as $key=>$value){
		$tran= $value['transmission_id'];
		 $res = $this->curl_fax_transmissions($tran, $token);
         $status = $res[0]['status'];
        $update_stat="UPDATE sent_fax set status='$status' where transmission_id='$tran' ";
        $this->db_query($update_stat, array());
      }
	
      $process_count="Select transmission_id from sent_fax where status='processing'";
      $rowcount=$this->dataRowCount($get_process, array());
		//print_r($rowcount);exit;
      if($rowcount>0){
        $result='false';
      }else{
        $result='true';
      }
    return $result;
	}
     
	public function add_didnumber($data){
      extract($data);
      $get_did_qry = "SELECT * FROM did_number WHERE  didnumber='$didnumber'";  
      $result = $this->fetchData($get_did_qry,array());    
      if($result > 0){
        $result = 0;
        return $result;
      }
      else{
        $token = $this->fax_curl();		    
        $data = array("active"=>"1",
          "username"=>$didnumber,
          "phone"=>$didnumber,
          "first_name"=>$title,);
        $did_id = $this->add_fax_didnumber($data, $token);
        if($did_id != ''){			
          $qry_result = $this->db_query("INSERT INTO did_number(did_id,didnumber,title) VALUES ( '$did_id','$didnumber','$title')", array());
          $result = $qry_result == 1 ? 1 : 0;
          return $result;
        }else{
          $result = 0;
          return $result;
        }
      }
    }
    public function edit_didnumber($data){
      extract($data);
      $get_did_qry = "SELECT * FROM did_number WHERE did_id='$didid'";  
      $result = $this->fetchData($get_did_qry,array());    
      if($result > 0){        
        return $result;
      }
      else{        
          $result = 0;
          return $result;        
      }
    }
    public function didnumber_list()
    {      
      //$qry = "select * from did_number"; 
		//echo "SELECT did_number.*,admin_details.name FROM did_number LEFT JOIN admin_details ON did_number.did_id LIKE admin_details.did_id";exit;
	  $qry = "SELECT did_number.*,admin_details.name FROM did_number LEFT JOIN admin_details ON did_number.did_id LIKE admin_details.did_id";	
      $result = $this->dataFetchAll($qry, array()); 
      return $result;
    }
	public function update_didnumber($data){
        extract($data);//print_r($data);exit;   
        $token = $this->fax_curl();
        $user_id = $this->get_didnumber_data($didid,$token);       
        if($user_id != ''){
          $data = array("active"=>"1",
          "account_id"=>$didid,
          "first_name"=>$title,
          "phone"=>$didnumber,
          "user_id"=>$user_id);
          $account_id = $this->update_didnumber_data($data,$didid,$token);
          if($account_id != ''){ 
			  //echo "UPDATE did_number SET did_id='$didid',didnumber='$didnumber',title='$title'";exit;
            $qry_result = $this->db_query("UPDATE did_number SET did_id='$didid',didnumber='$didnumber',title='$title' WHERE id='$id'", array());
            $result = $qry_result == 1 ? 1 : 0;
            return $result;
          }else{
            $result = 0;
            return $result;
          }
        }else{
          $result = 0;
          return $result;
        }      
    }
	public function delete_didnumber($data){
      extract($data);
      $token = $this->fax_curl();
      $status = $this->delete_didnumber_data($didid,$token); 
      if($status=='true'){     
        $qry = "DELETE FROM did_number where id='$id'";
        $parms = array();
        $results = $this->db_query($qry,$parms);      
        $output = $results == 1 ? 1 : 0;    
        return  $output;
      }
      else{
          $output = 0;
          return $output;
        }
    }
	public function assign_didnumber($fax_data){
        extract($fax_data); //print_r($fax_data);exit;    
        $token = $this->fax_curl();
        $status = $this->user_assign_ddidnumber($didid,$selected_user_id,$token);        
        if($status == 'true'){
            $get_qry = "SELECT * FROM admin_details WHERE fax_user_id='$selected_user_id'";
            $results = $this->fetchData($get_qry,array());
            $did_id = $results['did_id'];
            if($did_id==''){ //echo "1";exit;           
            $qry_result = $this->db_query("UPDATE admin_details SET did_id='$didid' WHERE fax_user_id='$selected_user_id'", array());
            $result = $qry_result == 1 ? 1 : 0;
            return $result;
            }else{//echo $did_id;exit;
              $implode = $did_id.",".$didid;
			  //print_r($implode);exit;
              $qry_result = $this->db_query("UPDATE admin_details SET did_id='$implode' WHERE fax_user_id='$selected_user_id'", array());
              $result = $qry_result == 1 ? 1 : 0;
              return $result;
            }         
        }else{
          $result = 0;
          return $result;
        }      
    }
	/*public function get_admin_didnumbers($fax_data){
        extract($fax_data);//print_r($fax_data);exit;
		//echo "SELECT * FROM user WHERE user_id='$user_id' AND fax_user_id='$fax_user_id'";exit;
        $get_qry = "SELECT * FROM user WHERE user_id='$user_id' AND fax_user_id='$fax_user_id'";
        $results = $this->fetchData($get_qry,array());
        if($results > 0){
		  $user_name = $results['email_id'];
          $password = $results['password'];
          $token = $this->fax_curl_admin($user_name,$password);
          $result_data = $this->get_admin_did_number_curl($token);          
        }else{
          $result = 0;
          return $result;
        }       
    }*/
	public function get_admin_didnumbers($fax_data){
        extract($fax_data);//print_r($fax_data);exit;
        $get_qry = "SELECT * FROM user WHERE user_id='$user_id' AND fax_user_id='$fax_user_id'";
        $results = $this->fetchData($get_qry,array());//print_r($results);exit;
        if($results > 0){//echo "1";exit;          
		  $user_name = $results['email_id'];
           $password = $results['password'];
          $token = $this->fax_curl_admin($user_name,$password);//echo $token;exit;
          $res = $this->get_admin_did_number_curl($token);//print_r($res);exit;
          $cnt = count($res);
          if($cnt > 0){//echo "if";exit;
            for($i=0;$i<$cnt;$i++){
              $didnumber_options = array('did_id' => $res[$i]->account_id, 'didnumber' => $res[$i]->username, 'title' => $res[$i]->first_name, 'email' => $res[$i]->email);                                   
              $didnumber_options_array[] = $didnumber_options;
            }
            $status = array('status' => 'true');
            $didnumber_options_array = array('didnumber_options' => $didnumber_options_array);
            $merge_result = array_merge($status, $didnumber_options_array);   
            $tarray = json_encode($merge_result);           
            print_r($tarray);exit;
          }else{//echo "el";exit;
            $status = array('status' => 'false');
            $tarray = json_encode($status);           
            print_r($tarray);exit;
          }			 
        }else{//echo "2";exit;
          $result = 0;
          return $result;
        }       
    }
	public function assign_email_didnumber($fax_data){
        extract($fax_data);//print_r($fax_data);exit;		
        $get_qry = "SELECT * FROM user WHERE user_id='$user_id' AND fax_user_id='$fax_user_id'";
        $results = $this->fetchData($get_qry,array());
        if($results > 0){          
          $user_name = $results['user_name'];
          $password = $results['password'];
          $token = $this->fax_curl_admin($user_name,$password);
          $data = array("account_id" =>$didid,
          "username"=>$username,
          "active" =>"1",
          "email"=>$email,/*User input*/
          "first_name"=>$first_name,
          "phone"=>$phone,
          "service_name"=>"faxtoemail",
          "user_id"=>$fax_user_id);
			//print_r($data);exit;
          $email = $this->assign_email_didnumber_curl($data,$didid,$token);//echo $email;exit;
          if($email =='' || $email=='null'){
            $result = 0;
            return $result;
          }else{
            $qry = "UPDATE did_number SET email='$email' WHERE did_id='$didid'";
            $qry_result = $this->db_query($qry, array());
            $result = $qry_result == 1 ? 1 : 0;            
            return $result;
          }
        }else{
          $result = 0;
          return $result;
        }               
    }
	
	/*public function receive_fax_list($fax_data){
        extract($fax_data);
        $get_qry = "SELECT * FROM user WHERE user_id='$user_id' AND fax_user_id='$fax_user_id'";
        $results = $this->fetchData($get_qry,array());
        if($results > 0){          
          $user_name = $results['user_name'];
          $password = $results['password'];
          $token = $this->fax_curl_admin($user_name,$password);
          $res = $this->receive_fax_curl($token);//print_r($res);exit;
          foreach ($res as $key) {      
            $tid = $key->transmission_id;
            $doc_data = $this->receive_fax_document_curl($tid,$token);
            $fax_options = array('id' => $key->transmission_id, 'didnumber' => $key->contact_phone, 'email' => $key->account_email, 'status' => $key->status, 'document_id' => $doc_data);       
            $fax_options_array[] = $fax_options;
          }
          $status = array('status' => 'true');            
          $fax_options_array = array('fax_options' => $fax_options_array);
          $merge_result = array_merge($status, $fax_options_array);           
          $tarray = json_encode($merge_result);           
          print_r($tarray);exit;
        }else{
          $status = array('status' => 'false');
          $tarray = json_encode($status);           
          print_r($tarray);exit;
        }               
    }*/
	public function download_fax_document($fax_data){
        extract($fax_data);
        $get_qry = "SELECT * FROM user WHERE user_id='$user_id' AND fax_user_id='$fax_user_id'";
        $results = $this->fetchData($get_qry,array());
        if($results > 0){          
          $user_name = $results['user_name'];
          $password = $results['password'];
          $token = $this->fax_curl_admin($user_name,$password);
          
        }else{
          $status = array('status' => 'false');
          $tarray = json_encode($status);           
          print_r($tarray);exit;
        }               
    }
	  public function receive_fax_list($fax_data){
        extract($fax_data);
        $get_qry = "SELECT * FROM user WHERE user_id='$user_id' AND fax_user_id='$fax_user_id'";
        $results = $this->fetchData($get_qry,array());//print_r($results);exit;
        if($results > 0){          
          $user_name = $results['user_name'];
          $password = $results['password'];
          $adminid = $results['admin_id'];
          if($adminid==1){
              $aid = $user_id;
          }else{
              $aid = $adminid;
          }
          $token = $this->fax_curl_admin($user_name,$password);
          $res = $this->receive_fax_curl($token);//print_r($res);exit;
          foreach ($res as $key) {      
            $tid = $key->transmission_id;
			$status = $key->status;
			//$tid = 853;
            $doc_id = $this->receive_fax_document_curl($tid,$token);			  
            $filepath = $this->upload_receive_fax_document_curl($doc_id,$token);			  
            if($status=='completed'){
			  $insertqry = $this->db_query("INSERT INTO receive_fax(admin_id,transmission_id,didnumber,email,status,document_id,document_url) VALUES ( '$aid','$tid','$key->contact_phone','$key->account_email','$key->status','$doc_id','$filepath')", array());                                  
			 }
			}
			$gets_qry = "SELECT * FROM receive_fax WHERE  admin_id='$aid'";   
            $result = $this->dataFetchAll($gets_qry,array());
			return $result;
        }else{
           $result = 0;
           return $result;
        }               
    }
}