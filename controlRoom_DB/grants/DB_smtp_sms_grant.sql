grant execute on sys.utl_smtp  TO controlroom;
grant execute on sys.utl_tcp  TO controlroom;
grant execute on sys.utl_http TO controlroom;
GRANT EXECUTE ON sys.UTL_INADDR TO controlroom;
 
begin
  dbms_network_acl_admin.create_acl (
  acl => 'http_permissions.xml', -- or any other name
  description => 'HTTP Access',
  principal => 'CONTROLROOM', -- the user name trying to access the network resource
  is_grant => TRUE,
  privilege => 'connect',
  start_date => SYSTIMESTAMP,
  end_date => NULL);
  COMMIT;
end;


begin
  DBMS_NETWORK_ACL_ADMIN.ADD_PRIVILEGE(acl => 'http_permissions.xml',
  principal => 'CONTROLROOM',
  is_grant => true,
  privilege => 'resolve');
  COMMIT;
end;

BEGIN
  dbms_network_acl_admin.assign_acl (
  acl => 'http_permissions.xml',
  host => '127.0.0.1', /*can be computer name or IP , wildcards are accepted as well for example - '*.us.oracle.com'*/
  lower_port => 80,
  upper_port => 80
  );
  COMMIT;
END;

/***************************************************************/
-- Drop ACL
BEGIN
DBMS_NETWORK_ACL_ADMIN.drop_acl (
acl => 'http_permissions.xml');
COMMIT;
END;

SELECT *
FROM dba_network_acl_privileges WHERE principal='CONTROLROOM'
