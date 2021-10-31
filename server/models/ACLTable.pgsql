create table if not exists ACLPermission(
AclId serial primary key,
menuName character varying(255) not null,
canViewTask bit not null,
canDeleteTask bit not null,
canAddTask bit not null,
roleid int not null 
)


alter table ACLPermission add constraint  RoleACLPermissionId
  FOREIGN KEY (roleid) 
   REFERENCES roles(id)
    ON DELETE cascade
    