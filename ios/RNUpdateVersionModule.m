
#import "RNUpdateVersionModule.h"
#import <UIKit/UIKit.h>

@implementation RNUpdateVersionModule

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(update:(NSString *)appleid ) {
    if ([appleid isEqualToString:@""] || appleid.length < 8) {
        return;
    }
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"https://itunes.apple.com/cn/app/id%@?mt=8", appleid]];
    [[UIApplication sharedApplication] openURL:url];
}

@end
  
