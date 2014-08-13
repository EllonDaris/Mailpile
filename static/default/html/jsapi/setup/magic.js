var SetupMagic = {
  status: 'error',
  provider: 'none',
  random_id: Math.random().toString(36).substring(2),
  providers: {
     'gmail.com': 'gmail' ,
     'googlemail.com': 'gmail',
     'hotmail.com': 'outlook',
     'outlook.com': 'outlook',
     'yahoo.com': 'yahoo'
  },
  presets: {
    gmail: {
      source: {
        name: 'Gmail',
        host: 'imap.gmail.com',
        port: 993,
        protocol: 'imap_ssl',
        interval: 300,
        'discovery.paths': []
      },
      sending: {
        name: 'Gmail',
        host: 'smtp.gmail.com',
        port: 587,
        protocol: 'smtp'
      }
    },
    outlook: {
      source: {
        name: 'Outlook',
        host: 'imap-mail.outlook.com',
        port: 993,
        protocol: 'imap_ssl',
        interval: 300,
        'discovery.paths': []
      },
      sending: {
        name: 'Outlook',
        host: 'smtp-mail.outlook.com',
        port: 587,
        protocol: 'smtp'
      }
    },
    yahoo: {
      source: {
        name: 'Yahoo',
        host: 'imap.mail.yahoo.com',
        port: 993,
        protocol: 'imap_ssl',
        interval: 300,
        'discovery.paths': []
      },
      sending: {
        name: 'Yahoo',
        host: 'smtp.mail.yahoo.com',
        port: 587,
        protocol: 'smtp'
      }
    }
  },
  processAdd: function(auth_data) {

    var provider = this.provider;
    var provider_data = this.presets[provider];

    // Add Sending
    var sending_data = _.extend(provider_data.sending, auth_data);
    sending_data['_section'] = 'routes.' + this.random_id;

    Mailpile.API.settings_set_post(sending_data, function(result) {

    });

    // Add Source
    var source_data = _.extend(provider_data.source, auth_data);
    source_data['_section'] = 'sources.' + this.random_id;

    Mailpile.API.settings_set_post(source_data, function(result) {

    });
  }
};