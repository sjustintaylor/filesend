module.exports = (link) => {
  return `
    <!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>
    
    <html xmlns=“https://www.w3.org/1999/xhtml”>
    
    <head>
    
    <title>Test Email Sample</title>
    
    <meta http–equiv=“Content-Type” content=“text/html; charset=UTF-8” />
    
    <meta http–equiv=“X-UA-Compatible” content=“IE=edge” />
    
    <meta name=“viewport” content=“width=device-width, initial-scale=1.0 “ />
    
    <style>
    
    <!— CSS code (if any) —>
    
    </style>
    
    </head>
    
<body class=“em_body” style=“margin:0px; padding:0px;” bgcolor=“#efefef”>
<p>Click here to continue logging into Filesend: <a href="${link}" target="_blank">continue to the Filesend app</a></p>
</body>
    `;
};
